// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config');

// Middleware para verificar la autenticación
const authenticateUser = async (req, res, next) => {
  try {

    // Obtain the token from the cookie
    const token = req.coolies.access_token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing access token' });
    }

    // Check if the token is in the blacklist
    const blacklisted = await isTokenBlacklisted(token);
    if (blacklisted) {
      return res.status(401).json({ message: 'Unauthorized: Revoked Token' });
    }

    // Extract the token from the Auth Request Header
    const authHeader = req.headers.authorization;

    // Verify if the Header exists in the cookie
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: Missing or invalid token' });
    }

    // Obtain the token without th argument "bearer"
    const authToken = authHeader.split(' ')[1];

    // Decode the token
    const decoded = jwt.verify(authToken, JWT_SECRET_KEY);

    req.user = decoded;

    // Check if the user's tokens are still valid
    const invalidated = await redisClient.get(`user:${decoded.userId}:invalidate`);
    if (invalidated) {
      return res.status(401).json({ message: 'Unauthorized: User tokens invalidated' });
    }

    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = {
  authenticateUser,
};