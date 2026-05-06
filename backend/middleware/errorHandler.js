export const errorHandler = (err, req, res, next) => {
  console.error('[Error]', err.message);

  if (err.message.includes('Only image files')) {
    return res.status(400).json({ error: 'Invalid file type. Please upload an image.' });
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File size exceeds 5MB limit' });
  }

  res.status(500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
};
