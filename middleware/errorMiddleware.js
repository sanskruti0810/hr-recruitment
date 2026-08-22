function errorHandler(err, req, res, next) {
  console.error(err);
  const isUploadError = err.name === 'MulterError' || err.message?.includes('Only PDF, DOC, and DOCX');
  const statusCode = isUploadError ? 400 : (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
  res.status(statusCode);
  res.json({
    message: isUploadError ? err.message : (err.message || 'Server Error'),
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
}

module.exports = { errorHandler };
