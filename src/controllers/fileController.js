/**
 * Controllers for file operations
 * Each exported function follows the Express `req, res, next` pattern.
 */
import {
  listDirectory,
  exists,
  getAbsolutePath,
  rename as renameService,
  deleteFile as deleteService,
} from "../services/fileService.js";
import { normalizePath } from "../utils/pathHelper.js";

/**
 * List files in storage directory
 * GET /files
 */
export const getFiles = async (req, res, next) => {
  try {
    const files = await listDirectory("");
    res.json({ files });
  } catch (err) {
    next(err);
  }
};

/**
 * Download a file. The route may include a trailing `/download` suffix
 * which is removed before resolving the path.
 */
export const downloadFile = (req, res, next) => {
  try {
    let filePathParam = normalizePath(req.params.splat);
    filePathParam = filePathParam.replace(/\/download$/, "");

    if (!exists(filePathParam)) {
      return res.status(404).json({ error: "File not found" });
    }

    // Delegate to Express to stream the file to the client
    res.download(getAbsolutePath(filePathParam));
  } catch (err) {
    next(err);
  }
};

/**
 * Send a file to be viewed by the client
 */
export const viewFile = (req, res, next) => {
  try {
    const filePathParam = normalizePath(req.params.splat);

    if (!exists(filePathParam)) {
      return res.status(404).json({ error: "File not found" });
    }

    res.sendFile(getAbsolutePath(filePathParam));
  } catch (err) {
    next(err);
  }
};

/**
 * Handle upload; multer has already saved the file to disk.
 */
export const uploadFile = (req, res) => {
  res.json({
    message: "File uploaded successfully",
    file: req.file,
  });
};

/**
 * Rename a file. Expects request body: { newName }
 */
export const renameFile = async (req, res, next) => {
  const filePathParam = normalizePath(req.params.splat);
  const { newName } = req.body;

  if (!exists(filePathParam)) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    await renameService(filePathParam, newName);
    res.json({ message: "File renamed successfully" });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a file from storage
 */
export const deleteFile = async (req, res, next) => {
  const filePathParam = normalizePath(req.params.splat);

  if (!exists(filePathParam)) {
    return res.status(404).json({ error: "File not found" });
  }

  try {
    await deleteService(filePathParam);
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    next(err);
  }
};
