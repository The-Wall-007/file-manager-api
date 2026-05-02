import fs from "fs";
import path from "path";

const STORAGE_PATH = path.join(process.cwd(), "storage");

// Read all files
export const readFiles = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(STORAGE_PATH, (err, files) => {
      if (err) return reject(err);
      resolve(files);
    });
  });
};

// Check file exists
export const fileExists = (filename) => {
  const filePath = path.join(STORAGE_PATH, filename);
  return fs.existsSync(filePath);
};

// Get full file path
export const getFilePath = (filename) => {
  return path.join(STORAGE_PATH, filename);
};

// Check existence
export const fileExists = (filename) => {
  return fs.existsSync(getFilePath(filename));
};

// Rename file
export const renameFileUtil = (oldName, newName) => {
  return new Promise((resolve, reject) => {
    fs.rename(getFilePath(oldName), getFilePath(newName), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

// Delete file
export const deleteFileUtil = (filename) => {
  return new Promise((resolve, reject) => {
    fs.unlink(getFilePath(filename), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
