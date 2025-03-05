// src/server.js
const app = require('./app');
const { PORT } = require('./config');

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});