const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Verificar si ya se ha enviado una respuesta
  if (res.headersSent) {
    return next(err);
  }

  // Manejo de errores específicos
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Invalid Data', details: err.message });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: 'Unauthorized: Token expired' });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }

  // Si el error tiene un código de estado personalizado, usarlo
  const statusCode = err.status || 500;
  return res.status(statusCode).json({ message: err.message || 'Oops, something went wrong with the server!' });
};

module.exports = errorHandler;