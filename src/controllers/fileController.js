import fs from "fs";
import path from "path";
import {
  fileExists,
  getFilePath,
  readFiles,
  renameFileUtil,
  deleteFileUtil,
} from "../utils/fileUtils.js";

const STORAGE_PATH = path.join(process.cwd(), "storage");

// GET files

export const getFiles = async (req, res, next) => {
  try {
    const files = await readFiles();
    res.json({ files });
  } catch (err) {
    next(err);
  }
};

// Download
export const downloadFile = (req, res, next) => {
  const filename = req.params.filename;

  if (!fileExists(filename)) {
    return res.status(404).json({ error: "File not found" });
  }

  const filePath = getFilePath(filename);
  res.download(filePath);
};

// View
export const viewFile = (req, res, next) => {
  const filename = req.params.filename;

  if (!fileExists(filename)) {
    return res.status(404).json({ error: "File not found" });
  }

  const filePath = getFilePath(filename);
  res.sendFile(filePath);
};

// Upload
export const uploadFile = (req, res) => {
  // multer already handled file saving
  res.json({
    message: "File uploaded successfully",
    file: req.file,
  });
};

// Rename
export const renameFile = async (req, res, next) => {
  const { filename } = req.params;
  const { newName } = req.body;

  if (!fileExists(filename)) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    await renameFileUtil(filename, newName);

    res.json({ message: "File renamed successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete
export const deleteFile = async (req, res, next) => {
  const { filename } = req.params;

  if (!fileExists(filename)) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    await deleteFileUtil(filename);

    res.json({ message: "File deleted successfully" });
  } catch (err) {
    next(err);
  }
};
