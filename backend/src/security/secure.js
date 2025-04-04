const express = require('express');
const path = require('path');

// Custom Security Middleware (CORS)
function secureApp(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // Manage requests OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    return res.status(200).json({});
  }

  next();
}


// Custom Security Middleware (serve static files)
const uploadsPath = express.static(path.join(__dirname, '../public/uploads'));
// Serve static files function
const staticFiles = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Cross-Origin-Resource-Policy", "cross-origin");

  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    return res.status(200).json({});
  }
  next();
}

module.exports = {
  secureApp,
  uploadsPath,
  staticFiles,
};
