require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

// Importa las rutas y el handler de errores
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./handlers/errorHandler');

const app = express();

// Middlewares para seguridad, parsing y cookies
app.use(cors({
  origin: "http://localhost:4000", // Origen del frontend
  credentials: true,              // Habilita credenciales (cookies)
}));

// Agregar headers CORS explícitos para la ruta /uploads
const uploadsPath = path.join(__dirname, 'public', 'uploads');
app.use('/uploads', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
}, express.static(uploadsPath));

// Middlewares globales
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas de la aplicación
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use(errorHandler);

// Ruta base de prueba
app.get('/', (req, res) => {
  const user = req.user;
  res.json({ message: 'Welcome to the API', user: user || null });
});

module.exports = app;

module.exports = app;