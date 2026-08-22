const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { uploadResume, getMyProfile } = require('../controllers/candidateController');
const { uploadResume: uploadResumeFile } = require('../middleware/uploadMiddleware');

router.get('/me', verifyToken, authorizeRoles('Candidate'), getMyProfile);
router.post('/resume', verifyToken, authorizeRoles('Candidate'), uploadResumeFile, uploadResume);

module.exports = router;
