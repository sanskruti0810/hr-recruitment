const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
  {
    applicationId: { type: String, unique: true, index: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'Candidate', required: true },
    resumeUrl: { type: String, default: 'Applied' },
    status: {
      type: String,
      enum: ['Applied', 'Under Review', 'Interview Scheduled', 'Interview Completed', 'Selected', 'Rejected', 'On Hold', 'Next Round'],
      default: 'Applied',
    },
    appliedAt: { type: Date, default: Date.now },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

// enforce one application per candidate per job
ApplicationSchema.index({ job: 1, candidate: 1 }, { unique: true });

// Auto-generate applicationId before saving (simple counter-based approach)
ApplicationSchema.pre('save', async function (next) {
  if (this.applicationId) return next();

  try {
    const now = new Date();
    const yearMonth = now.toISOString().slice(2, 7).replace('-', ''); // e.g., '2608'
    const count = await this.constructor.countDocuments();
    this.applicationId = `KITJOB${yearMonth}${String(count + 1).padStart(5, '0')}`;
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model('Application', ApplicationSchema);
