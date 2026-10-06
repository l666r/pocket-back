const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  time: { type: String, default: '09:00' },
  duration: { type: String, default: '1h' },
  cost: { type: Number, default: 0 },
  category: { type: String, default: 'Sight' }, // Sight, Food, Culture, Transit, Nature
  transitToNext: { type: String, default: 'Auto • 15 min • ₹80' },
  isLocked: { type: Boolean, default: false },
  day: { type: Number, default: 1 },
});

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: 'guest',
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Trip title is required'],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, 'Destination is required'],
      trim: true,
    },
    city: {
      type: String,
      default: 'Kochi',
      index: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    days: {
      type: Number,
      default: 2,
    },
    adults: {
      type: Number,
      default: 2,
    },
    budget: {
      type: Number,
      default: 5000,
    },
    weather: {
      type: String,
      default: 'Clear skies, 29°C • Pleasant breeze',
    },
    trafficPace: {
      type: String,
      default: 'Balanced (Kochi Metro & Water Metro combo)',
    },
    stops: [stopSchema],
    isFavorite: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'draft', 'completed', 'cancelled'],
      default: 'active',
      index: true,
    },
    shareCode: {
      type: String,
      unique: true,
      index: true,
      default: () => 'trip_' + Math.random().toString(36).substring(2, 10),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Trip', tripSchema);
