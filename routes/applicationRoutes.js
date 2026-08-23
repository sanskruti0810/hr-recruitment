const express = require('express');
const router = express.Router();
const { applyJob, getMyApplications, getAllApplications } = require('../controllers/applicationController');

// Temp protect - crash nako mhanun
const protect = (req, res, next) => {
  req.user = { _id: "test123", id: "test123" };
  next();
};

// IMPORTANT: Specific routes aadhi, :id nantar
router.get('/my-applications', protect, getMyApplications);
router.get('/my', protect, getMyApplications);
router.get('/', protect, getAllApplications);
router.post('/apply/:id', protect, applyJob);
router.post('/:id', protect, applyJob);

module.exports = router;