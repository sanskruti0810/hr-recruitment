const mongoose = require('mongoose');

const InterviewFeedbackSchema = new mongoose.Schema(
  {
    interview: { type: mongoose.Schema.Types.ObjectId, ref: 'Interview', required: true, unique: true },
    technicalRating: { type: Number, min: 1, max: 10, required: true },
    communicationRating: { type: Number, min: 1, max: 10, required: true },
    overallRating: { type: Number, min: 1, max: 10, required: true },
    comments: { type: String, default: '' },
    recommendation: { type: String, enum: ['Selected', 'Rejected', 'On Hold', 'Next Round'], required: true },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('InterviewFeedback', InterviewFeedbackSchema);
