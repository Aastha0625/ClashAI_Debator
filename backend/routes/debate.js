const express = require('express');
const router = express.Router();
const supabase = require('../supabase');
const { generateResponse, judgeDebate } = require('../services/aiService');

// AI Response Generation
router.post('/debate', async (req, res) => {
  try {
    const text = await generateResponse(req.body);
    res.json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message || "Generation failed." });
  }
});

// AI Judging
router.post('/judge', async (req, res) => {
  try {
    const verdict = await judgeDebate(req.body.topic, req.body.proArgs, req.body.conArgs);
    res.json(verdict);
  } catch (error) {
    res.status(500).json({ error: "Judging failed." });
  }
});

// Save Debate History
router.post('/debates/save', async (req, res) => {
  const { userId, topic, mode, rounds, proArgs, conArgs, verdict } = req.body;
  try {
    const { error } = await supabase
      .from('debates')
      .insert([
        { 
          user_id: userId || null, 
          topic, 
          mode, 
          rounds, 
          pro_args: proArgs, 
          con_args: conArgs, 
          verdict: verdict 
        }
      ]);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save." });
  }
});

// Get Debate History
router.get('/debates/history', async (req, res) => {
  const userId = req.query.userId;
  try {
    let query = supabase
      .from('debates')
      .select('*')
      .order('created_at', { ascending: false });

    if (userId && userId !== 'undefined' && userId !== '') {
      query = query.eq('user_id', userId);
    } else {
      // If no userId, return empty or only public/null debates. 
      // For now, keeping it consistent: guests see anonymous debates.
      query = query.is('user_id', null);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error("History error:", err);
    res.status(500).json({ error: "Database error." });
  }
});

// Delete Debate History
router.delete('/debates/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase
      .from('debates')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
