const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const {
  scheduleInterview,
  getAssignedInterviews,
  getMyCandidateInterviews,
  getInterviews,
  updateInterview,
} = require('../controllers/interviewController');

router.post('/schedule', verifyToken, authorizeRoles('Admin', 'HR'), scheduleInterview);
router.get('/assigned', verifyToken, authorizeRoles('Interviewer'), getAssignedInterviews);
router.get('/mine', verifyToken, authorizeRoles('Candidate'), getMyCandidateInterviews);
router.get('/', verifyToken, authorizeRoles('Admin', 'HR', 'Interviewer'), getInterviews);
router.put('/:id', verifyToken, authorizeRoles('Admin', 'HR'), updateInterview);

module.exports = router;
