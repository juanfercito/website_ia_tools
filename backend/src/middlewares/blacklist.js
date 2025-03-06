const redisClient = require('../config/redis');

// Add the token to the blacklist
const addToBlacklist = async (token) => {
  try {
    await redisClient.set(`blacklist:${token}`, 'revoked', 'EX', 60 * 60 * 24); // Expira en 1 día
  } catch (error) {
    console.error('Error adding token to blacklist:', error.message);
  }
};

// Verify if the token is already in the blacklist
const isTokenBlacklisted = async (token) => {
  try {
    const result = await redisClient.get(`blacklist:${token}`);
    // Return true if the token is already in the blacklist
    return !!result; 
  } catch (error) {
    console.error('Error checking blacklist:', error.message);
    return false;
  }
};

module.exports = { addToBlacklist, isTokenBlacklisted };