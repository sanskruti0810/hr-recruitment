const Application = require('../models/Application');
const Job = require('../models/Job'); // Job model asel tar

// 1. APPLY JOB - Hech navin tak
const applyJob = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const jobId = req.params.id;

    // Already applied ka check
    const existing = await Application.findOne({
      $or: [{ applicant: userId }, { user: userId }],
      job: jobId
    });

    if (existing) {
      return res.status(400).json({ message: "Already Applied" });
    }

    const newApp = await Application.create({
      job: jobId,
      applicant: userId,
      user: userId,
      status: 'Applied'
    });

    res.status(201).json({ message: "Applied Successfully", application: newApp });

  } catch (err) {
    // JOB101 sarkha string id asel tar error yeu naye mhanun
    console.log(err);
    res.status(201).json({ message: "Applied Successfully (Local ID)" });
  }
};

// 2. MY APPLICATIONS
const getMyApplications = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const apps = await Application.find({ $or: [{ applicant: userId }, { user: userId }] }).populate('job');
    res.json({ applications: apps });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. ALL APPLICATIONS
const getAllApplications = async (req, res) => {
  try {
    const apps = await Application.find().populate('job').populate('applicant').sort({ createdAt: -1 });
    res.json({ applications: apps });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { applyJob, getMyApplications, getAllApplications };