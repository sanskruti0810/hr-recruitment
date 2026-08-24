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

// Tumche routes ithe add kara - jase tumchyakade hote
// Example:
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/jobs', require('./routes/jobRoutes'));

module.exports = app;