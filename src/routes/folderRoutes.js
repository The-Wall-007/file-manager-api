/**
 * Routes for folder operations mounted under `/folders`.
 */
import express from "express";
import { createFolder, getFolders } from "../controllers/folderController.js";

const router = express.Router();

// List folders (optionally within a path)
router.get("/", getFolders);

// Create a folder. Request body: { path: "relative/path" }
router.post("/", createFolder);

export default router;
