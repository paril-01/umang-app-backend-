const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/send-weekly-sms', reportController.sendWeeklyReports);

module.exports = router;
