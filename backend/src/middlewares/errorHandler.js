// src/middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  // Manejo de errores específicos
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Invalid Data', details: err.message });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }

  // Si el error tiene un código de estado personalizado, usarlo
  const statusCode = err.status || 500;
  return res.status(statusCode).json({ message: 'Oops, something went wrong with the server!' });
};

module.exports = errorHandler;