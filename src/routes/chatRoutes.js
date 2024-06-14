const express = require('express');
const Message = require('../models/messageModel');

const router = express.Router();

// Endpoint to get recent messages
router.get('/', async (req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(10); 
    res.json(messages);
});

module.exports = router;
