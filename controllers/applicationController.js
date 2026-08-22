const Application = require('../models/Application');
const Job = require('../models/Job');
const Candidate = require('../models/Candidate');

// @desc    Candidate job sathi apply karel
// @route   POST /api/applications/apply
// @access  Candidate
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    // 1. Job aahe ka check
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // 2. Job closed aahe ka check
    if (job.status === 'Closed') {
      return res.status(400).json({ message: 'Cannot apply to a closed job' });
    }

    // 3. Deadline geli ka check
    if (job.applicationDeadline && new Date(job.applicationDeadline) < new Date()) {
      return res.status(400).json({ message: 'Application deadline has passed' });
    }

    // 4. Candidate profile aan
    const candidate = await Candidate.findOne({ user: req.user.id });
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate profile not found' });
    }

    // 5. Adhich apply kela aahe ka check
    const alreadyApplied = await Application.findOne({ 
      job: jobId, 
      candidate: candidate._id 
    });
    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // 6. Navin application banav
    const application = await Application.create({
      job: jobId,
      candidate: candidate._id,
      status: 'Applied'
    });

    res.status(201).json(application);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Candidate chi sagli applications aan
// @route   GET /api/applications/my-applications
// @access  Candidate
const getMyApplications = async (req, res) => {
  try {
    const candidate = await Candidate.findOne({ user: req.user.id });
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate profile not found' });
    }

    const applications = await Application.find({ candidate: candidate._id })
      .populate('job', 'title company location salary')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin la saglya applications disayla
// @route   GET /api/applications
// @access  Admin, HR, Interviewer
const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({})
      .populate('job', 'title company')
      .populate('candidate', 'name email')
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { applyForJob, getMyApplications, getApplications };