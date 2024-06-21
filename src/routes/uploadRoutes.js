const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Handle file upload
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
    }
    const fileUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;

  // Emit the uploaded file details via Socket.IO
    req.app.get('io').emit('file-upload', { 
    filename: req.file.filename, 
    url: fileUrl,
    timestamp: new Date().toISOString()
    });

    res.status(201).send({ 
    filename: req.file.filename, 
    url: fileUrl 
    });
});

module.exports = router;
