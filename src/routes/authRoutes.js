const express = require('express');
const router = express.Router();
const {
  register,
  verifyOtp,
  login,
  resendOtp,
  getMe,
  updatePreferences,
  toggleFavorite,
} = require('../controllers/authController');

// JWT Protection Middleware
const jwt = require('jsonwebtoken');
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'budgo_secure_jwt_secret_key_2026_spatial_intel'
    );
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token invalid or expired' });
  }
};

router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/resend-otp', resendOtp);
router.get('/me', protect, getMe);
router.put('/preferences', updatePreferences);
router.post('/favorites', toggleFavorite);

module.exports = router;
