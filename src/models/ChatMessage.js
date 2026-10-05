const mongoose = require('mongoose');

const chatSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: 'guest',
      index: true,
    },
    title: {
      type: String,
      default: 'PocketRoute AI Chat',
    },
    shareCode: {
      type: String,
      unique: true,
      index: true,
      default: () => 'chat_' + Math.random().toString(36).substring(2, 10),
    },
    messages: [
      {
        sender: {
          type: String,
          enum: ['user', 'assistant'],
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ChatSession', chatSessionSchema);
