const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/submit-feedback', feedbackController.submitFeedback);

module.exports = router;
