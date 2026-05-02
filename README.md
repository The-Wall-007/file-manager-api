# 📁 File Manager API Documentation

## Base URL

```
http://localhost:3000
```

> The server reads `process.env.PORT` and defaults to `3000`.

---

## Files API

All file endpoints are mounted under `/files`. Paths are relative to the project's `storage` directory.

- `GET /files` — list entries at the storage root.
- `GET /files/*splat/download` — download a file at the given relative path.
- `GET /files/*splat` — view a file at the given relative path.
- `POST /files` — upload a single file (multipart form, field name `file`).
- `PUT /files/*splat` — rename the file at the given relative path. Body: `{ "newName": "..." }`.
- `DELETE /files/*splat` — delete the file at the given relative path.

### 1. List Files

**Endpoint**

```
GET /files
```

**Description**
Returns files and directories immediately under the storage root.

**Response (example)**

```json
{
  "files": [
    { "name": "images", "isDirectory": true, "path": "images" },
    { "name": "a.txt", "isDirectory": false, "path": "a.txt" }
  ]
}
```

### 2. Download File

**Endpoint**

```
GET /files/<relative/path/to/file>/download
```

**Example**

```
GET /files/documents/report.pdf/download
```

**Description**
Streams the file to the client as an attachment.

### 3. View File

**Endpoint**

```
GET /files/<relative/path/to/file>
```

**Example**

```
GET /files/images/photo.png
```

**Description**
Sends the raw file contents. If you need to list directory contents, use the `/folders` endpoints (see below).

### 4. Upload File

**Endpoint**

```
POST /files
```

**Content-Type**

```
multipart/form-data
```

**Body**

- key: `file` — the file to upload.

**Example (cURL)**

```bash
curl -X POST http://localhost:3000/files \
  -F "file=@test.txt"
```

**Notes**

- Uploaded files are saved to the `storage` folder. The current Multer setup saves files into the storage root and preserves the original filename.
- Uploading a file with the same name will overwrite the existing file.

### 5. Rename File

**Endpoint**

```
PUT /files/<relative/path/to/file>
```

**Body**

```json
{ "newName": "updated.txt" }
```

**Behavior**

- If the target is nested like `folder/old.txt`, the service preserves the containing directory and replaces only the final segment with `newName`.

### 6. Delete File

**Endpoint**

```
DELETE /files/<relative/path/to/file>
```

**Response (example)**

```json
{ "message": "File deleted successfully" }
```

---

## Folders API

Folder-specific endpoints are mounted under `/folders`. These endpoints focus on directory operations (listing and creation).

- `GET /folders?path=<relative/path>` — list directories at the given relative path (defaults to root).
- `POST /folders` — create a directory; body: `{ "path": "relative/path/to/create" }`.

### List Folders

**Endpoint**

```
GET /folders?path=images
```

**Response (example)**

```json
{
  "folders": [{ "name": "2026", "path": "images/2026" }]
}
```

### Create Folder

**Endpoint**

```
POST /folders
```

**Body**

```json
{ "path": "new/folder/path" }
```

**Response (example)**

```json
{ "message": "Folder created successfully", "path": "new/folder/path" }
```

---

## Error Responses

- `404 Not Found` — when a requested file or folder does not exist.
- `400 Bad Request` — when required fields are missing (e.g., creating a folder without `path`).
- `500 Internal Server Error` — unexpected server errors.

Example:

```json
{ "error": "File not found" }
```

---

## Notes & Implementation Details

- Files and folders are stored under the project's `storage` folder.
- Path inputs are validated and resolved safely to prevent directory traversal; attempts to access paths outside `storage` will be rejected.
- File uploads currently save to the storage root and preserve the original filename; nested uploads (creating intermediate directories as part of the upload) are not implemented.
- No authentication or authorization is implemented.
- Use `npm run dev` to start the server in development (requires `nodemon`).

---

## Quick Examples

List files:

```bash
curl http://localhost:3000/files
```

Download:

```bash
curl -O http://localhost:3000/files/documents/report.pdf/download
```

View:

```bash
curl http://localhost:3000/files/images/photo.png
```

Upload:

```bash
curl -X POST http://localhost:3000/files -F "file=@test.txt"
```

Rename:

```bash
curl -X PUT http://localhost:3000/files/test.txt -H "Content-Type: application/json" -d '{"newName":"updated.txt"}'
```

Delete:

```bash
curl -X DELETE http://localhost:3000/files/test.txt
```

List folders:

```bash
curl http://localhost:3000/folders?path=images
```

Create folder:

```bash
curl -X POST http://localhost:3000/folders -H "Content-Type: application/json" -d '{"path":"new/folder"}'
```
