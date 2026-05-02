import express from "express";
import fileRoutes from "./routes/fileRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import logger from "./middlewares/logger.js";

const app = express();

app.use(express.json());
app.use(logger);

// Routes
app.use("/files", fileRoutes);

// Error middleware (ALWAYS LAST)
app.use(errorMiddleware);

export default app;
