 //Role-based Authorization Middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    // req.user comes from JWT auth middleware
    const userRole = req.user.role;

    // Check user's role 
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied: insufficient permissions',
      });
    }

    next(); // allow access if role matches
  };
};

module.exports = authorize;