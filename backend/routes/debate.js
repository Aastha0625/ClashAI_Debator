const express = require('express');
const router = express.Router();
const db = require('../database');
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
router.post('/debates/save', (req, res) => {
  const { userId, topic, mode, rounds, proArgs, conArgs, verdict } = req.body;
  db.run(`
    INSERT INTO debates (user_id, topic, mode, rounds, pro_args, con_args, verdict)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [
    userId || null, topic, mode, rounds, 
    JSON.stringify(proArgs), JSON.stringify(conArgs), JSON.stringify(verdict)
  ], function(err) {
    if (err) return res.status(500).json({ error: "Failed to save." });
    res.json({ success: true });
  });
});

// Get Debate History
router.get('/debates/history', (req, res) => {
  const userId = req.query.userId;
  db.all('SELECT * FROM debates WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC', [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error." });
    res.json(rows.map(d => ({
      ...d,
      pro_args: JSON.parse(d.pro_args),
      con_args: JSON.parse(d.con_args),
      verdict: JSON.parse(d.verdict)
    })));
  });
});

// Delete Debate History
router.delete('/debates/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM debates WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, changes: this.changes });
  });
});

module.exports = router;
