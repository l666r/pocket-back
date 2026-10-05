const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'budgo_secure_jwt_secret_key_2026_spatial_intel',
    { expiresIn: '30d' }
  );
};

// @desc    Register a new user & generate OTP (12345)
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, mobile, password, confirmPassword } = req.body;

    // Basic Validations
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    const cleanMobile = mobile.replace(/[^0-9]/g, '');
    if (cleanMobile.length !== 10) {
      return res.status(400).json({ message: 'Mobile number must be exactly 10 digits' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    let existingUser = await User.findOne({
      $or: [{ email: cleanEmail }, { mobile: cleanMobile }],
    });

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({
          message: 'An account with this email or mobile already exists. Please sign in.',
        });
      } else {
        // User registered but never completed OTP verification; update info & resend OTP
        existingUser.name = name.trim();
        existingUser.password = password;
        existingUser.otp = '12345';
        existingUser.otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await existingUser.save();

        return res.status(200).json({
          success: true,
          message: 'Account updated. Verification OTP is 12345',
          email: existingUser.email,
          mobile: existingUser.mobile,
          name: existingUser.name,
        });
      }
    }

    // Create new user (OTP is 12345 as requested)
    const newUser = await User.create({
      name: name.trim(),
      email: cleanEmail,
      mobile: cleanMobile,
      password,
      otp: '12345',
      otpExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
      isVerified: false,
    });

    res.status(201).json({
      success: true,
      message: 'Account registered successfully. Verification OTP is 12345',
      email: newUser.email,
      mobile: newUser.mobile,
      name: newUser.name,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message || 'Server error during registration' });
  }
};

// @desc    Verify 5-Digit OTP (12345) & return JWT
// @route   POST /api/auth/verify-otp
exports.verifyOtp = async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
      return res.status(400).json({ message: 'Identifier and OTP are required' });
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const cleanOtp = otp.toString().trim();

    // Find by email or mobile
    const user = await User.findOne({
      $or: [{ email: cleanIdentifier }, { mobile: cleanIdentifier }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found. Please register first.' });
    }

    // Check OTP: Allow 12345 or user's stored OTP
    const isValidOtp = cleanOtp === '12345' || cleanOtp === user.otp;

    if (!isValidOtp) {
      return res.status(400).json({ message: 'Invalid OTP. For prototype testing, use 12345.' });
    }

    // Mark as verified
    user.isVerified = true;
    user.otp = undefined; // clear OTP
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Verification successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: error.message || 'Server error during OTP verification' });
  }
};

// @desc    Login with Email or Mobile + Password
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: 'Please enter your email or mobile and password' });
    }

    const cleanIdentifier = identifier.trim().toLowerCase();

    // Find user by email or mobile
    const user = await User.findOne({
      $or: [{ email: cleanIdentifier }, { mobile: cleanIdentifier }],
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials. User does not exist.' });
    }

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password. Please try again.' });
    }

    // If registered but not verified yet, instruct to verify OTP
    if (!user.isVerified) {
      user.otp = '12345';
      await user.save();
      return res.status(200).json({
        requiresOtp: true,
        message: 'Account not yet verified. Please enter the 5-digit verification code.',
        email: user.email,
        mobile: user.mobile,
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Server error during login' });
  }
};

// @desc    Resend OTP (12345)
// @route   POST /api/auth/resend-otp
exports.resendOtp = async (req, res) => {
  try {
    const { identifier } = req.body;
    if (!identifier) {
      return res.status(400).json({ message: 'Identifier is required' });
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const user = await User.findOne({
      $or: [{ email: cleanIdentifier }, { mobile: cleanIdentifier }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.otp = '12345';
    user.otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Verification code resent! (Test OTP: 12345)',
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ message: error.message || 'Server error resending OTP' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};
