const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables reliably from backend/.env
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const chatRoutes = require('./routes/chatRoutes');
const placeRoutes = require('./routes/placeRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const intelligenceRoutes = require('./routes/intelligenceRoutes');

const app = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
connectDB();

// Health Check Route
app.get('/api/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.status(isDbConnected ? 200 : 503).json({
    status: isDbConnected ? 'ok' : 'connecting',
    database: isDbConnected ? 'connected' : 'connecting',
    dbName: mongoose.connection.name || 'pocketroute',
    time: new Date().toISOString(),
    service: 'PocketRoute Auth & Location API',
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/intelligence', intelligenceRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: `Endpoint ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 PocketRoute Server running on http://localhost:${PORT}`);
});
