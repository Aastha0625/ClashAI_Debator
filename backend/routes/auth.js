const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../supabase');

const JWT_SECRET = process.env.JWT_SECRET || 'arena-neural-secret-key';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, password: hashedPassword }])
      .select();

    if (error) {
      if (error.code === '23505') return res.status(400).json({ error: "Username already exists." });
      return res.status(400).json({ error: error.message });
    }
    res.json({ success: true, userId: data[0].id });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user) return res.status(401).json({ error: "Invalid credentials." });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET);
      res.json({ token, username: user.username, userId: user.id });
    } else {
      res.status(401).json({ error: "Invalid credentials." });
    }
  } catch (err) {
    res.status(500).json({ error: "Database error." });
  }
});

module.exports = router;
