const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema(
  {
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application', required: true },
    interviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    scheduledAt: { type: Date, required: true },
    type: { type: String, enum: ['HR', 'Technical', 'Final'], required: true },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
    mode: { type: String, enum: ['In Person', 'Online', 'Phone'], default: 'Online' },
    location: { type: String, default: '' },
  },
  { timestamps: true }
);

// Validate scheduledAt is in the future
InterviewSchema.path('scheduledAt').validate(function (value) {
  return value && value > new Date();
}, 'Interview cannot be scheduled in the past');

module.exports = mongoose.model('Interview', InterviewSchema);
