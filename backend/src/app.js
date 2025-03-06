
require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

const app = express();

// Middlewares for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    const token = req.cookies.access_token;

    if (token) {
        try {
            const data = jwt.verify(token, JWT_SECRET_KEY);
            req.user = data;
        } catch (error) {
            console.error('Error verifying token', error.message);
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