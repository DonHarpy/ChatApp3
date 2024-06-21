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
  limits: { fileSize: 4000000 }, // Limit to 1MB
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
};

module.exports = { uploadFile };
