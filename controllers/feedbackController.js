const Interview = require('../models/Interview');
const Application = require('../models/Application');
const InterviewFeedback = require('../models/InterviewFeedback');

const submitFeedback = async (req, res, next) => {
  try {
    const { interviewId, technicalRating, communicationRating, overallRating, comments, recommendation } = req.body;
    const interviewerId = req.user.id;

    if (!interviewId || technicalRating == null || communicationRating == null || overallRating == null || !recommendation) {
      return res.status(400).json({ message: 'Missing required feedback fields' });
    }

    const interview = await Interview.findById(interviewId).populate('application');
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }
    if (String(interview.interviewer) !== interviewerId) {
      return res.status(403).json({ message: 'Forbidden: not assigned to this interview' });
    }
    if (interview.status === 'Completed') {
      const existing = await InterviewFeedback.findOne({ interview: interview._id });
      if (existing) {
        return res.status(400).json({ message: 'Feedback already submitted' });
      }
    }

    const feedback = await InterviewFeedback.create({
      interview: interview._id,
      technicalRating,
      communicationRating,
      overallRating,
      comments: comments || '',
      recommendation,
      submittedBy: interviewerId,
    });

    interview.status = 'Completed';
    await interview.save();

    const application = await Application.findById(interview.application._id);
    application.status = 'Interview Completed';
    await application.save();

    return res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};

const getFeedbackForInterviewer = async (req, res, next) => {
  try {
    const feedbacks = await InterviewFeedback.find({ submittedBy: req.user.id })
      .populate({ path: 'interview', populate: { path: 'application interviewer', select: 'application status name' } })
      .sort({ createdAt: -1 });
    return res.json(feedbacks);
  } catch (error) {
    next(error);
  }
};

module.exports = { submitFeedback, getFeedbackForInterviewer };
