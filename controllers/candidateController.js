const Candidate = require('../models/Candidate');

const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    const candidate = await Candidate.findOne({ user: req.user.id });
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate profile not found' });
    }

    const resumeUrl = `/uploads/${req.file.filename}`;
    candidate.resumeUrl = resumeUrl;
    await candidate.save();

    return res.json({
      message: 'Resume uploaded successfully',
      resumeUrl,
      candidate,
    });
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    const candidate = await Candidate.findOne({ user: req.user.id }).populate('user', 'name email role');
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate profile not found' });
    }
    return res.json(candidate);
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadResume, getMyProfile };
