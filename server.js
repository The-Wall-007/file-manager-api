/**
 * Server entrypoint
 *
 * Starts the Express application exported from `src/app.js`.
 * - Reads the port from `process.env.PORT` (defaults to 3000)
 * - Installs basic process handlers for graceful shutdown and logging
 */
import app from "./src/app.js";

const DEFAULT_PORT = 3000;
const PORT = Number(process.env.PORT) || DEFAULT_PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown helper
const shutdown = (signal) => {
  console.log(`Received ${signal}; closing server...`);
  server.close(() => {
    console.log("Server closed. Exiting.");
    process.exit(0);
  });

  // Force exit if shutdown hangs
  setTimeout(() => {
    console.error("Forcing shutdown after timeout.");
    process.exit(1);
  }, 10000).unref();
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

// Development-time diagnostics for uncaught errors
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  // Exit on uncaught exception to avoid unknown process state
  process.exit(1);
});
