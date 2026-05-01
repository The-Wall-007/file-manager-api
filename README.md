# 📁 File Manager API Documentation

## Base URL

```
http://localhost:3000
```

---

## 📄 1. Get All Files

**Endpoint**

```
GET /files
```

**Description**
Returns list of all files in storage.

**Response**

```json
{
  "files": ["file1.txt", "image.png"]
}
```

---

## ⬇️ 2. Download File

**Endpoint**

```
GET /files/:filename/download
```

**Example**

```
GET /files/sample.pdf/download
```

**Description**
Downloads the file.

**Response**
Triggers file download (binary response).

---

## 👁️ 3. View File

**Endpoint**

```
GET /files/:filename
```

**Example**

```
GET /files/image.png
```

**Description**
Displays file in browser (if supported).

---

## ⬆️ 4. Upload File

**Endpoint**

```
POST /files
```

**Content-Type**

```
multipart/form-data
```

**Body**

- key: `file`
- value: file to upload

**Example (cURL)**

```bash
curl -X POST http://localhost:3000/files \
  -F "file=@test.txt"
```

**Response**

```json
{
  "message": "File uploaded successfully",
  "file": {
    "originalname": "test.txt",
    "filename": "test.txt"
  }
}
```

---

## ✏️ 5. Rename File

**Endpoint**

```
PUT /files/:filename
```

**Example**

```
PUT /files/test.txt
```

**Body**

```json
{
  "newName": "updated.txt"
}
```

**Response**

```json
{
  "message": "File renamed successfully"
}
```

---

## ❌ 6. Delete File

**Endpoint**

```
DELETE /files/:filename
```

**Example**

```
DELETE /files/test.txt
```

**Response**

```json
{
  "message": "File deleted successfully"
}
```

---

## ⚠️ Error Responses

### File Not Found

```json
{
  "error": "File not found"
}
```

### Server Error

```json
{
  "error": "Something went wrong"
}
```

---

## 🧠 Notes

- Files are stored in `/storage` folder
- Upload will overwrite files with same name
- No authentication implemented
- No file validation (type/size)

---
