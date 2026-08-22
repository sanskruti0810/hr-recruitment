const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = require('./app');

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`Server listening on port ${PORT}`)))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });