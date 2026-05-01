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

router.get("/", getFiles);
router.get("/:filename/download", downloadFile);
router.get("/:filename", viewFile);
router.post("/", upload.single("file"), uploadFile);
router.put("/:filename", renameFile);
router.delete("/:filename", deleteFile);

export default router;
