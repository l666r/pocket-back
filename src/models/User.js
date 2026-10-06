const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      unique: true,
      trim: true,
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    otp: {
      type: String,
      default: '12345',
    },
    otpExpiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 15 * 60 * 1000), // 15 mins
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    hasCompletedOnboarding: {
      type: Boolean,
      default: false,
    },
    preferences: {
      likes: {
        type: [String],
        default: ['movies', 'travel', 'cafes', 'transit', 'heritage', 'events', 'sunsets'],
      },
      dislikes: {
        type: [String],
        default: [],
      },
      selectedCity: {
        type: String,
        default: 'Kochi',
      },
      currency: {
        type: String,
        default: 'INR',
      },
    },
    favorites: [
      {
        id: { type: String, required: true },
        itemType: { type: String, default: 'place' }, // 'place' | 'trip' | 'movie' | 'trail'
        title: { type: String, required: true },
        subtitle: { type: String, default: '' },
        image: { type: String, default: '' },
        rating: { type: Number, default: 5 },
        city: { type: String, default: 'Kochi' },
        addedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Helper to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
