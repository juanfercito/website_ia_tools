require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./handlers/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares for parsing JSON, Security and cookies
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:4000", // Allows requests from the Frontend
        credentials: true, // Enable credentials and cookies for requests
    }));

app.use('/auth', authRoutes); // Routes for authentication
app.use('/user', userRoutes); // Routes for authenticated users
app.use(errorHandler); // Middleware for error handling

// Service for static elements and files
console.log('Serving static files from:', path.join(__dirname, 'public/uploads'));
const uploadsPath = path.join(__dirname, 'public', 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.get('/', (req, res) => {
    const user = req.user;
    res.json({ message: 'Welcome to the API', user });
    user: user || null
})

app.use("/uploads", (req, res, next) => {
    console.log("Acceso a archivos estáticos:", req.path);
    next();
  });
  

module.exports = app;