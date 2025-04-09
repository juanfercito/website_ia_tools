require('dotenv').config();
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const {errorHandler} = require('./handlers/errorHandler');
const { secureApp, uploadsPath, staticFiles } = require('./security/secure');

// Import Application routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const { checTokenBlacklist } = require('./middlewares/tokenBlacklist');

const app = express(); // Initialize application

app.use(compression({
  level: 6,
  threshold: 0,
})); // Enable compression for all responses

// Right Configuration of Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "default-src": ["'self'"],
      "img-src": ["'self'", "http://localhost:3000", "http://localhost:4000", "data:"], // Allow images from same origins
      "script-src": ["'self", "https://cdn.jsdelivr.net"], // Allow scripts from CDN
      "style-src": ["'self'", "https://cdn.jsdelivr.net"], // Allow styles from CDN
      "font-src": ["'self'", "https://cdn.jsdelivr.net"], // Allow fonts from CDN
      "connect-src": ["'self'", "http://localhost:4000"],
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Adjusting CORP for estatic resources
}));
// Custom Security Middleware (CORS)
app.use(secureApp);

// Global Middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Application Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Middleware for serving Static Files from /uploads
app.use('/uploads', uploadsPath, staticFiles);

// Route Root for testing purposes
app.get('/', (req, res) => {
  const user = req.user;
  res.json({ message: 'Welcome to the API', user: user || null });
});

// Error handling
app.use(errorHandler);
// Middleware for checking token blacklist(For security reasons)
app.use(checTokenBlacklist);

module.exports = app;