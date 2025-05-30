// middleware/validate.middleware.js

import jwt from 'jsonwebtoken'; // Make sure jwtSecret is defined in config

/**
 * Middleware to verify JWT token from the Authorization header.
 */
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Expecting format: Bearer <token>
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your actual secret
    req.user = decoded; // Attach user payload to request
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};
