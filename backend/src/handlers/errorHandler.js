// Global Error Handler
function errorHandler(err, req, res, next) {

    console.error("Error caught by errorHandler:", err);
  
    // Determine HTTP status code
    const statusCode = err.statusCode || 500;
  
    // Message Friendly with the User
    const message = err.message || "It was a unexpected Error. Please, try again later.";
  
    // Response to Client
    res.status(statusCode).json({
      status: "error",
      code: statusCode,
      message: message,
    });
  }
  
  module.exports = {errorHandler};