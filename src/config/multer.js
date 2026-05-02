import multer from "multer";
import path from "path";
import fs from "fs";
import { safePath } from "../utils/fileUtils.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const userPath = req.query.path || "";

      const fullPath = safePath(userPath);

      // ensure directory exists
      fs.mkdirSync(fullPath, { recursive: true });

      cb(null, fullPath);
    } catch (err) {
      cb(err);
    }
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export default multer({ storage });
