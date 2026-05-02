/**
 * Express error-handling middleware.
 * Logs the error and returns a JSON response with a 500 status code.
 */
const errorMiddleware = (err, req, res, next) => {
  // Log to console - replace with a proper logger in production
  console.error(err);

  res.status(500).json({
    error: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;
