const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir)
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

app.post('/upload', upload.array('files'), (req, res) => {
    const fileUrls = req.files.map((file) => `/uploads/${file.filename}`);
    res.json({ message: 'Files uploaded successfully', files: fileUrls });
});

app.get('/files', (req, res) => {
    const uploadDir = path.join(__dirname, 'uploads');
    fs.readdir(uploadDir, (err, files) => {
      if (err) return res.status(500).json({ error: 'Failed to read files' });
      const fileUrls = files.map((file) => `/uploads/${file}`);
      res.json(fileUrls);
    });
});
  
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});