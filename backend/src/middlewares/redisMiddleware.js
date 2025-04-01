const redisClient = require('../config/redis');

const cacheUser = async (req, res, next) => {
    const userId = req.user.id;
    const cacheKey = `user:${userId}`;

    try {
        const cachedUser = await redisClient.get(cacheKey);
        if (cachedUser) {
            req.cacheUser = JSON.parse(cachedUser);
            return next();
        }
        // If not cached, proceed to the next middleware
        next();

    } catch (err) {
        console.error('Redis cache error: ', err);
        next();
    };
};

module.exports = cacheUser;