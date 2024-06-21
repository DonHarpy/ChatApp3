const Message = require('../models/messageModel');

const setupWebSocket = (io) => {
    io.on('connection', (socket) => {
    console.log('New client connected');

    // Handling chat messages
    socket.on('chatMessage', async (msg) => {
        const newMessage = new Message({ text: msg.text, media: msg.media });
        await newMessage.save();
        io.emit('message', newMessage); 
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
    });
    socket.on('file-upload', (file) => {
        console.log('Received file:', file);
        io.emit('file-upload', file);
        });
};

module.exports = { setupWebSocket };
