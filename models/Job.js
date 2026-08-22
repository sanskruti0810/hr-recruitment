const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    description: { type: String, default: '' },
    skills: [{ type: String }],
    experience: { type: Number, default: 0 },
    employmentType: { type: String, default: 'Full Time' },
    location: { type: String, default: '' },
    salaryRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
    },
    openPositions: { type: Number, default: 1 },
    applicationDeadline: { type: Date },
    status: { type: String, enum: ['Open', 'Closed'], default: 'Open' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
