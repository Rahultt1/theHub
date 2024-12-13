const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer" header
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token found!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to the request for further usage
    next(); // Move to the next middleware/route handler
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Not authorized, invalid token!' });
  }
};

module.exports = { protect };