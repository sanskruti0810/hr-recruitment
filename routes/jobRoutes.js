const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobController');

router.get('/', verifyToken, getJobs);
router.get('/:id', verifyToken, getJobById);
router.post('/', verifyToken, authorizeRoles('Admin', 'HR'), createJob);
router.put('/:id', verifyToken, authorizeRoles('Admin', 'HR'), updateJob);
router.delete('/:id', verifyToken, authorizeRoles('Admin', 'HR'), deleteJob);

module.exports = router;
