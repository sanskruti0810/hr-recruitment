const Interview = require('../models/Interview');
const Application = require('../models/Application');
const User = require('../models/User');
const Candidate = require('../models/Candidate');

const scheduleInterview = async (req, res, next) => {
  try {
    const { applicationId, interviewerId, scheduledAt, type, mode, location } = req.body;

    if (!applicationId || !interviewerId || !scheduledAt || !type) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const interviewer = await User.findById(interviewerId);
    if (!interviewer || interviewer.role !== 'Interviewer') {
      return res.status(404).json({ message: 'Interviewer not found' });
    }

    const scheduleDate = new Date(scheduledAt);
    if (scheduleDate <= new Date()) {
      return res.status(400).json({ message: 'Interview cannot be scheduled in the past' });
    }

    const interview = await Interview.create({
      application: application._id,
      interviewer: interviewer._id,
      scheduledAt: scheduleDate,
      type,
      mode: mode || 'Online',
      location: location || '',
    });

    application.status = 'Interview Scheduled';
    await application.save();

    return res.status(201).json(interview);
  } catch (error) {
    next(error);
  }
};

const getAssignedInterviews = async (req, res, next) => {
  try {
    const interviews = await Interview.find({ interviewer: req.user.id })
      .populate({ path: 'application', populate: { path: 'job', select: 'title department status' } })
      .populate({ path: 'application', populate: { path: 'candidate', select: 'resumeUrl' } })
      .sort({ scheduledAt: 1 });
    return res.json(interviews);
  } catch (error) {
    next(error);
  }
};

const getMyCandidateInterviews = async (req, res, next) => {
  try {
    const candidate = await Candidate.findOne({ user: req.user.id });
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate profile not found' });
    }

    const applications = await Application.find({ candidate: candidate._id }).select('_id');
    const applicationIds = applications.map((application) => application._id);
    const interviews = await Interview.find({ application: { $in: applicationIds } })
      .populate('interviewer', 'name email')
      .populate({ path: 'application', populate: { path: 'job', select: 'title department' } })
      .sort({ scheduledAt: 1 });
    return res.json(interviews);
  } catch (error) {
    next(error);
  }
};

const getInterviews = async (req, res, next) => {
  try {
    const { status, interviewer, date } = req.query;
    const query = {};
    if (status) query.status = status;
    if (interviewer) query.interviewer = interviewer;
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      query.scheduledAt = { $gte: start, $lt: end };
    }

    const interviews = await Interview.find(query)
      .populate('interviewer', 'name email')
      .populate({ path: 'application', populate: { path: 'job candidate', select: 'title user' } })
      .sort({ scheduledAt: 1 });
    return res.json(interviews);
  } catch (error) {
    next(error);
  }
};

const updateInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    const { scheduledAt, type, mode, location, status } = req.body;
    if (scheduledAt) {
      const scheduleDate = new Date(scheduledAt);
      if (scheduleDate <= new Date()) {
        return res.status(400).json({ message: 'Interview cannot be scheduled in the past' });
      }
      interview.scheduledAt = scheduleDate;
    }
    if (type) interview.type = type;
    if (mode) interview.mode = mode;
    if (location) interview.location = location;
    if (status) interview.status = status;

    await interview.save();
    return res.json(interview);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  scheduleInterview,
  getAssignedInterviews,
  getMyCandidateInterviews,
  getInterviews,
  updateInterview,
};
