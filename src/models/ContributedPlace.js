const mongoose = require('mongoose');

const contributedPlaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Place name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Sight', 'Food & Cafe', 'Culture & Heritage', 'Transit & Ferry', 'Nature & Sunset', 'Shopping', 'Hidden Gem'],
      default: 'Sight',
    },
    area: {
      type: String,
      required: [true, 'Area/City is required (e.g. Fort Kochi)'],
      trim: true,
    },
    city: {
      type: String,
      default: 'Kochi',
      index: true,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    ratingCount: {
      type: Number,
      default: 1,
    },
    comments: [
      {
        user: { type: String, default: 'Explorer' },
        text: { type: String, required: true },
        rating: { type: Number, default: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    address: {
      type: String,
      default: '',
    },
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    entryFee: {
      type: Number,
      default: 0,
    },
    bestTime: {
      type: String,
      default: 'Evening (5:00 PM – 7:00 PM)',
    },
    description: {
      type: String,
      required: [true, 'Description/Tips required'],
      trim: true,
    },
    contributedBy: {
      type: String,
      default: 'Local Explorer',
    },
    upvotes: {
      type: Number,
      default: 1,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ContributedPlace', contributedPlaceSchema);
