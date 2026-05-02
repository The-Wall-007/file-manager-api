/**
 * Service layer for folder (directory) operations.
 *
 * Keeps directory-specific logic separate from file operations.
 */
import fs from "fs";
import path from "path";
import {
  getFilePath,
  createDirectory as createDirectoryUtil,
} from "../utils/fileUtils.js";

/**
 * Create a directory (and parents) inside storage.
 * @param {string} relativePath
 */
export const createDirectory = async (relativePath) => {
  await createDirectoryUtil(relativePath);
};

/**
 * List only directories at the given relative path inside storage.
 * Returns array of { name, path }
 */
export const listDirectories = async (relativePath = "") => {
  const absPath = getFilePath(relativePath);
  const dirents = await fs.promises.readdir(absPath, { withFileTypes: true });
  return dirents
    .filter((d) => d.isDirectory())
    .map((d) => ({
      name: d.name,
      path: path.posix.join(relativePath || "", d.name),
    }));
};

export default {
  createDirectory,
  listDirectories,
};
