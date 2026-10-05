const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: 'anonymous',
    },
    userName: {
      type: String,
      default: 'PocketRoute Explorer',
    },
    category: {
      type: String,
      enum: ['Feature Request', 'UI & Design', 'Route & Pricing Accuracy', 'New City Request', 'Other'],
      default: 'Feature Request',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    message: {
      type: String,
      required: [true, 'Suggestion text is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'implemented'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Suggestion', suggestionSchema);
