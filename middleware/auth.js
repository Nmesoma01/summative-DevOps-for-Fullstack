const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'Access denied: No token provided' });
  }

  try {
    // Verify the token using the secret stored in an environment variable
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    // Handle invalid token error
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
