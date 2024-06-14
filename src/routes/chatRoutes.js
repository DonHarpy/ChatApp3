const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');

// Fetch all messages
router.get('/', async (req, res) => {
    try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
    } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new message
router.post('/', async (req, res) => {
    try {
    const { text } = req.body;
    const newMessage = new Message({ text });
    await newMessage.save();
    res.status(201).json(newMessage);
    } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
