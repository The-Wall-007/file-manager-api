/**
 * Express application setup
 * - Applies CORS and JSON body parsing
 * - Attaches request logger middleware
 * - Mounts file-related routes under `/files`
 * - Adds the error handler as the last middleware
 */
import express from "express";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes.js";
import folderRoutes from "./routes/folderRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import logger from "./middlewares/logger.js";

const app = express();

// Built-in and third-party middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Mount application routes
app.use("/files", fileRoutes);
// Separate folder-related endpoints
app.use("/folders", folderRoutes);

// Error handler must be last so it can catch upstream errors
app.use(errorMiddleware);

export default app;
