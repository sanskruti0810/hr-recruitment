const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// All Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/candidates', require('./routes/candidateRoutes'));
app.use('/api/applications', require('./routes/applicationRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));
app.use('/api/interviews', require('./routes/interviewRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));

module.exports = app;