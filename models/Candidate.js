const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    qualification: { type: String, default: '' },
    experience: { type: Number, default: 0 },
    skills: [{ type: String }],
    resumeUrl: { type: String, default: '' },
    currentCompany: { type: String, default: '' },
    expectedSalary: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Candidate', CandidateSchema);
