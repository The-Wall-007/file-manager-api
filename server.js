// import express from "express";
// import fs from "fs";
// import path from "path";
// import multer from "multer";

// const app = express();
// const PORT = 3000;

// const STORAGE_PATH = path.join(process.cwd(), "storage");

// // Middleware
// app.use(express.json());

// // Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, STORAGE_PATH);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage });

// // GET /files
// app.get("/files", (req, res) => {
//   fs.readdir(STORAGE_PATH, (err, files) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to read files" });
//     }

//     res.json({ files });
//   });
// });

// // Download file
// app.get("/files/:filename/download", (req, res) => {
//   const filePath = path.join(STORAGE_PATH, req.params.filename);

//   if (!fs.existsSync(filePath)) {
//     return res.status(404).json({ error: "File not found" });
//   }

//   res.download(filePath);
// });

// // View file
// app.get("/files/:filename", (req, res) => {
//   const filePath = path.join(STORAGE_PATH, req.params.filename);

//   if (!fs.existsSync(filePath)) {
//     return res.status(404).json({ error: "File not found" });
//   }

//   res.sendFile(filePath);
// });

// // Upload route
// app.post("/files", upload.single("file"), (req, res) => {
//   res.json({
//     message: "File uploaded successfully",
//     file: req.file,
//   });
// });

// // Rename file
// app.put("/files/:filename", (req, res) => {
//   const oldPath = path.join(STORAGE_PATH, req.params.filename);
//   const newPath = path.join(STORAGE_PATH, req.body.newName);

//   // Check if old file exists
//   if (!fs.existsSync(oldPath)) {
//     return res.status(404).json({ error: "File not found" });
//   }

//   // Rename file
//   fs.rename(oldPath, newPath, (err) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to rename file" });
//     }

//     res.json({
//       message: "File renamed successfully",
//     });
//   });
// });

// // Delete file
// app.delete("/files/:filename", (req, res) => {
//   const filePath = path.join(STORAGE_PATH, req.params.filename);

//   // Check if file exists
//   if (!fs.existsSync(filePath)) {
//     return res.status(404).json({ error: "File not found" });
//   }

//   fs.unlink(filePath, (err) => {
//     if (err) {
//       return next(err); // 👈 pass error forward
//     }

//     res.json({
//       message: "File deleted successfully",
//     });
//   });
// });

// app.use((err, req, res, next) => {
//   console.error(err);

//   res.status(500).json({
//     error: "Something went wrong",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
