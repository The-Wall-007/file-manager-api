import express from "express";
import fileRoutes from "./routes/fileRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());

// Routes
app.use("/files", fileRoutes);

// Error middleware (ALWAYS LAST)
app.use(errorMiddleware);

export default app;
