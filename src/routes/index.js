const express = require('express');
const chatRoutes = require('./chatRoutes');
const uploadRoutes = require('./uploadRoutes');

const router = express.Router();

// Use chatRoutes for /api/messages endpoint
router.use('/api/messages', chatRoutes);

// Use uploadRoutes for /api/upload endpoint
router.use('/api/upload', uploadRoutes);

module.exports = router;
