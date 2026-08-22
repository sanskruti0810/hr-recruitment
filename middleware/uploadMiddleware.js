const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDirectory = path.join(__dirname, '..', 'uploads');
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = `${req.user.id}-${Date.now()}${extension}`;
    callback(null, safeName);
  },
});

const allowedMimeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const fileFilter = (req, file, callback) => {
  if (!allowedMimeTypes.has(file.mimetype)) {
    return callback(new Error('Only PDF, DOC, and DOCX resumes are allowed'));
  }
  return callback(null, true);
};

const uploadResume = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('resume');

module.exports = { uploadResume };
