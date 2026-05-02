import fs from "fs";
import path from "path";

const STORAGE_PATH = path.join(process.cwd(), "storage");

/**
 * Read entries in the storage folder.
 * Returns an array of filenames (or directory names) present in storage.
 */
export const readFiles = async () => {
  return fs.promises.readdir(STORAGE_PATH);
};

/**
 * Synchronously check whether a given relative filename exists inside storage.
 * @param {string} filename - path relative to the storage folder
 * @returns {boolean}
 */
export const fileExists = (filename) => {
  try {
    return fs.existsSync(safePath(filename));
  } catch {
    return false;
  }
};

/**
 * Resolve a filename to an absolute path inside the storage folder.
 */
export const getFilePath = (filename) => {
  return safePath(filename);
};

/**
 * Rename a file inside storage. Returns a Promise that resolves on success.
 */
export const renameFileUtil = async (oldName, newName) => {
  await fs.promises.rename(getFilePath(oldName), getFilePath(newName));
};

/**
 * Delete a file inside storage. Returns a Promise that resolves on success.
 */
export const deleteFileUtil = async (filename) => {
  await fs.promises.unlink(getFilePath(filename));
};

export const createDirectory = (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(getFilePath(dirPath), { recursive: true }, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

export const safePath = (userPath) => {
  const resolvedPath = path.resolve(STORAGE_PATH, userPath);

  if (!resolvedPath.startsWith(STORAGE_PATH)) {
    throw new Error("Invalid path");
  }

  return resolvedPath;
};
