const Feedback = require('../models/Feedback');

// Create new feedback
const createFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json({ success: true, feedback });
  } catch (err) {
    next(err);  // Pass errors to the error handler
  }
};

// Get all feedback
const getAllFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json({ success: true, feedback });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createFeedback,
  getAllFeedback
};
