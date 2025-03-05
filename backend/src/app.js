
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

module.exports = app;