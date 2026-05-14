const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const debateRoutes = require('./routes/debate');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', debateRoutes);

// Server Init
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`ClashAI Neural Backend running on http://localhost:${PORT}`);
});
