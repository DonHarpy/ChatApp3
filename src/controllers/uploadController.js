const path = require('path');
const multer = require('multer');

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 4000000 }, 
    fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
    }
}).single('media');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
    return cb(null, true);
    } else {
    cb('Error: Images Only!');
    }
}

const uploadFile = (req, res) => {
    upload(req, res, (err) => {
    if (err) {
        res.status(400).json({ message: err });
    } else {
        if (req.file === undefined) {
        res.status(400).json({ message: 'No file selected' });
        } else {
        res.status(200).json({
            message: 'File uploaded',
            file: `uploads/${req.file.filename}`
        });
        }
    }
    });
};// Handle file upload
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

module.exports = { uploadFile };
