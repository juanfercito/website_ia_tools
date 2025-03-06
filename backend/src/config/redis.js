const redis = require('redis');

// Crear cliente de Redis
const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

// Conectar a Redis
redisClient.connect().then(() => {
  console.log('Connected to Redis');
}).catch((err) => {
  console.error('Redis connection error:', err);
});

module.exports = redisClient;