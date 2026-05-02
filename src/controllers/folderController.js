/**
 * Controller for folder (directory) endpoints.
 */
import { createDirectory, listDirectories } from "../services/folderService.js";

export const createFolder = async (req, res, next) => {
  const { path } = req.body;

  if (!path) {
    return res.status(400).json({ error: "Path is required" });
  }

  try {
    await createDirectory(path);
    res.json({ message: "Folder created successfully", path });
  } catch (err) {
    next(err);
  }
};

export const getFolders = async (req, res, next) => {
  try {
    const folders = await listDirectories(req.query.path || "");
    res.json({ folders });
  } catch (err) {
    next(err);
  }
};

export default { createFolder, getFolders };
