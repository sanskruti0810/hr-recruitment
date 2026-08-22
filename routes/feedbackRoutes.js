const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { submitFeedback, getFeedbackForInterviewer } = require('../controllers/feedbackController');

router.post('/submit', verifyToken, authorizeRoles('Interviewer'), submitFeedback);
router.get('/mine', verifyToken, authorizeRoles('Interviewer'), getFeedbackForInterviewer);

module.exports = router;
