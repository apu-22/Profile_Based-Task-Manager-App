const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if token exists in header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  // Extracts Bearer token
  const token = authHeader.split(' ')[1];

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info (id, role, etc.) to request
    req.user = decoded;

    next(); // allow access to protected route
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

module.exports = protect;