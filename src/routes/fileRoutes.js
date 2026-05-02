/**
 * Routes for file management
 *
 * Endpoints mounted under `/files`:
 * - GET `/`                -> list files
 * - GET `/*splat/download`  -> download a file (declare before view)
 * - GET `/*splat`           -> view a file or directory
 * - POST `/`               -> upload a file (field name: `file`)
 * - PUT `/*splat`           -> rename a file (body: { newName })
 * - DELETE `/*splat`        -> delete a file
 */
import express from "express";
import upload from "../config/multer.js";
import {
  getFiles,
  downloadFile,
  viewFile,
  uploadFile,
  renameFile,
  deleteFile,
} from "../controllers/fileController.js";

const router = express.Router();

// List files
router.get("/", getFiles);

// Download route must come before the generic "view" route
router.get("/*splat/download", downloadFile);

// View file or directory
router.get("/*splat", viewFile);

// Upload a single file (multipart/form-data, field name: "file")
router.post("/", upload.single("file"), uploadFile);

// Rename and delete operations operate on the splat path
router.put("/*splat", renameFile);
router.delete("/*splat", deleteFile);

// Folder creation moved to /folders routes

export default router;
