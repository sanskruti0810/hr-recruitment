const express = require('express');
const cors = require('cors');
const path = require('path');
const departmentRoutes = require('./routes/departmentRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/candidates', candidateRoutes);

app.get('/api/ping', (req, res) => {
  res.json({ message: 'HR Recruitment API is running' });
});

app.use(errorHandler);

module.exports = app;