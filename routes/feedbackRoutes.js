const express = require('express');
const { createFeedback, getAllFeedback } = require('../controllers/feedbackController');
const router = express.Router();

// POST route to create feedback
router.post('/', createFeedback);

// GET route to fetch all feedback
router.get('/', getAllFeedback);

module.exports = router;
