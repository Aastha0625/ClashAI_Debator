const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

const JWT_SECRET = process.env.JWT_SECRET || 'arena-neural-secret-key';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
      if (err) return res.status(400).json({ error: "Username already exists." });
      res.json({ success: true, userId: this.lastID });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error." });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) return res.status(500).json({ error: "Database error." });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET);
      res.json({ token, username: user.username, userId: user.id });
    } else {
      res.status(401).json({ error: "Invalid credentials." });
    }
  });
});

module.exports = router;
