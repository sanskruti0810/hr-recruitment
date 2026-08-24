const dotenv = require('dotenv');
dotenv.config(); 

const connectDB = require('./config/db');
const app = require('./app');


connectDB();


module.exports = app;


if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}