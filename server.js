const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = require('./app');

dotenv.config();

// MongoDB connect - Vercel sathi important
connectDB();

// Vercel sathi app export karne garjeche ahe
module.exports = app;

// Local la chalvaycha asel tarach listen kar
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}