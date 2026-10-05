const Suggestion = require('../models/Suggestion');

// @desc Submit user feedback & suggestion
// @route POST /api/feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { category, message, rating, userName, userId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Suggestion text is required' });
    }

    const suggestion = await Suggestion.create({
      category: category || 'Feature Request',
      message: message.trim(),
      rating: Number(rating) || 5,
      userName: userName || 'PocketRoute User',
      userId: userId || 'anonymous',
    });

    res.status(201).json({ success: true, message: 'Thank you! Your suggestion was recorded.', suggestion });
  } catch (error) {
    console.error('submitFeedback error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get recent suggestions / feedback
// @route GET /api/feedback
exports.getFeedback = async (req, res) => {
  try {
    const suggestions = await Suggestion.find().sort({ createdAt: -1 }).limit(20);
    res.status(200).json({ success: true, count: suggestions.length, suggestions });
  } catch (error) {
    console.error('getFeedback error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
