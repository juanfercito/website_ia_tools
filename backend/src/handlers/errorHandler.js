// Middleware para manejar errores de forma centralizada
function errorHandler(err, req, res, next) {
    // Registro del error en la consola para depuración
    console.error("Error capturado por errorHandler:", err);
  
    // Determinar el código de estado HTTP
    const statusCode = err.statusCode || 500;
  
    // Mensaje amigable para el usuario
    const message = err.message || "Ocurrió un error inesperado. Por favor, inténtalo más tarde.";
  
    // Respuesta al cliente
    res.status(statusCode).json({
      status: "error",
      code: statusCode,
      message: message,
    });
  }
  
  // Exportar el middleware
  module.exports = errorHandler;