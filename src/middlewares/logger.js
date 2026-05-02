/**
 * Simple request logger middleware.
 * Logs the HTTP method and URL for incoming requests.
 */
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

export default logger;
