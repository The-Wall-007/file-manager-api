import fs from "fs";
import path from "path";

const STORAGE_PATH = path.join(process.cwd(), "storage");

// GET files
export const getFiles = (req, res, next) => {
  fs.readdir(STORAGE_PATH, (err, files) => {
    if (err) return next(err);

    res.json({ files });
  });
};

// Download
export const downloadFile = (req, res, next) => {
  const filePath = path.join(STORAGE_PATH, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.download(filePath);
};

// View
export const viewFile = (req, res, next) => {
  const filePath = path.join(STORAGE_PATH, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  res.sendFile(filePath);
};

// Upload
export const uploadFile = (req, res) => {
  res.json({
    message: "File uploaded successfully",
    file: req.file,
  });
};

// Rename
export const renameFile = (req, res, next) => {
  const oldPath = path.join(STORAGE_PATH, req.params.filename);
  const newPath = path.join(STORAGE_PATH, req.body.newName);

  if (!fs.existsSync(oldPath)) {
    return res.status(404).json({ error: "File not found" });
  }

  fs.rename(oldPath, newPath, (err) => {
    if (err) return next(err);

    res.json({ message: "File renamed successfully" });
  });
};

// Delete
export const deleteFile = (req, res, next) => {
  const filePath = path.join(STORAGE_PATH, req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  fs.unlink(filePath, (err) => {
    if (err) return next(err);

    res.json({ message: "File deleted successfully" });
  });
};
