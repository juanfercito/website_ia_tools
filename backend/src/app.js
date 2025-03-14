require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
// Import application routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./handlers/errorHandler');

const app = express();

// Middlewares for security, parsing and cookies
app.use(cors({
  origin: "http://localhost:4000", // Frontend Origin URL
  credentials: true,              // Enable credentials (cookies)
}));
const uploadsPath = path.join(__dirname, 'public', 'uploads'); // Upload static files
app.use('/uploads', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
}, express.static(uploadsPath));

// Global Middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Application Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use(errorHandler);

// Base Testing Route
app.get('/', (req, res) => {
  const user = req.user;
  res.json({ message: 'Welcome to the API', user: user || null });
});

module.exports = app;