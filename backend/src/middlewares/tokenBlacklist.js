const redisClient = require('../config/redis');
const dotenv = require('dotenv');

dotenv.config();

const checTokenBlacklist = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        // Check if the token is blacklisted
        const isBlacklisted = await redisClient.get(`blacklist:${token}`);
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        next();
    } catch (err) {
        console.error('Redis blacklist error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    };
};

// Middleware function for addying token to blacklist
const addToBlacklist = async (req, res, next) => {
    try {
        const jwtExpiration = process.env.JWT_EXPIRATION || '2h'; // Default expiration time
        const expirationTime = convertToSeconds(jwtExpiration);

        await redisClient.set(`blacklist:${req.token}`, 'blacklisted', 'true'), { EX: expirationTime };
        console.log(`Token added to blacklist with expiration time: ${expirationTime} seconds`);
    } catch (err) {
        console.error('Error adding token to blacklist:', err);
    };
};

const convertToSeconds = (duration) => {
    const timeUnits = {
      s: 1,
      m: 60,
      h: 60 * 60,
      d: 24 * 60 * 60,
    };
  
    const match = duration.match(/^(\d+)([smhd])$/); // Ejemplo: "1d" -> [1, "d"]
    if (!match) throw new Error('Invalid JWT_EXPIRATION format');
  
    const value = parseInt(match[1], 10);
    const unit = match[2];
    return value * timeUnits[unit];
  };

module.exports = {
  checTokenBlacklist,
  addToBlacklist,
};