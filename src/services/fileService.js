/**
 * Service layer for file and directory operations.
 *
 * This module encapsulates higher-level business logic for working with
 * files and folders inside the project's `storage` directory. It delegates
 * low-level path safety and atomic operations to `src/utils/fileUtils.js`.
 */
import fs from "fs";
import path from "path";
import {
  fileExists,
  getFilePath,
  readFiles,
  renameFileUtil,
  deleteFileUtil,
} from "../utils/fileUtils.js";

/**
 * List entries in a directory inside storage.
 * Returns an array of objects: { name, isDirectory, path }
 */
export const listDirectory = async (relativePath = "") => {
  const absPath = getFilePath(relativePath);
  const dirents = await fs.promises.readdir(absPath, { withFileTypes: true });
  return dirents.map((d) => ({
    name: d.name,
    isDirectory: d.isDirectory(),
    path: path.posix.join(relativePath || "", d.name),
  }));
};

export const exists = (relativePath) => fileExists(relativePath);

export const getAbsolutePath = (relativePath) => getFilePath(relativePath);

/**
 * Rename an entry inside storage. If the entry is nested, preserves the
 * containing directory and only replaces the final segment with `newName`.
 */
export const rename = async (relativePath, newName) => {
  const dir = path.dirname(relativePath);
  const newRelative =
    dir === "." || dir === "" ? newName : path.join(dir, newName);
  await renameFileUtil(relativePath, newRelative);
};

export const deleteFile = async (relativePath) => {
  await deleteFileUtil(relativePath);
};

export const readFileStream = (relativePath) =>
  fs.createReadStream(getFilePath(relativePath));
