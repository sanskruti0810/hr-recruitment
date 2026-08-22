const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { applyForJob, getMyApplications, getApplications } = require('../controllers/applicationController');

router.post('/apply', verifyToken, authorizeRoles('Candidate'), applyForJob);
router.get('/my-applications', verifyToken, authorizeRoles('Candidate'), getMyApplications);
router.get('/', verifyToken, authorizeRoles('Admin', 'HR', 'Interviewer'), getApplications);

module.exports = router;
