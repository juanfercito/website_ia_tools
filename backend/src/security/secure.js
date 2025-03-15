// security/secure.js
const express = require('express');
const path = require('path');

const uploadsPath = express.static(path.join(__dirname, '../public/uploads'));

// Middleware de seguridad personalizado (CORS)
function secureApp(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // Manejar solicitudes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    return res.status(200).json({});
  }

  next();
}

module.exports = {
  secureApp,
  uploadsPath,
};
