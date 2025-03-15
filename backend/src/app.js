require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const errorHandler = require('./handlers/errorHandler');
const { secureApp, uploadsPath } = require('./security/secure');

// Importar rutas de la aplicación
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Configuración correcta de Helmet con CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "default-src": ["'self'"],
      "img-src": ["'self'", "http://localhost:3000", "http://localhost:4000", "data:"], // Permitir imágenes desde ambos origenes
      "connect-src": ["'self'", "http://localhost:4000"],
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }, // ✅ Ajustar CORP para recursos estáticos
}));
// Middleware de seguridad personalizado (CORS)
app.use(secureApp);

// Middlewares globales
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas de la aplicación
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Servir archivos estáticos desde /uploads
app.use('/uploads', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Cross-Origin-Resource-Policy", "cross-origin");

  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    return res.status(200).json({});
  }
  next();
}, uploadsPath);

// Ruta base de prueba
app.get('/', (req, res) => {
  const user = req.user;
  res.json({ message: 'Welcome to the API', user: user || null });
});

// Manejador de errores
app.use(errorHandler);

module.exports = app;