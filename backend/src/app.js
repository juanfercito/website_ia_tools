
require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./handlers/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

const app = express();

// Middlewares for parsing JSON, Security and cookies
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:4000", // Allows requests from the Frontend
        credentials: true, // Enable credentials and cookies for requests
    }));
app.use((err, req, res, next) => {
    const token = req.cookies.access_token;

    if (token) {
        try {
            const data = jwt.verify(token, JWT_SECRET_KEY);
            req.user = data;
        } catch (error) {
            console.error('Error verifying token', error.message);
            res.status(500).json({status: "error", message: error.message});
        }
    }
    next();
})

app.use('/auth', authRoutes); // Routes for authentication
app.use(errorHandler); // Middleware for error handling

app.get('/', (req, res) => {
    const user = req.user;
    res.json({ message: 'Welcome to the API', user });
    user: user || null
})

module.exports = app;