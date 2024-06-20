require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require("cors");
const { setupWebSocket } = require('./src/controllers/chatController');
const { connectDB } = require('./config/db');
const path = require('path');


const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
    origin: '*',
    },
});


connectDB();

app.use(cors());


app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.get('/test', (req, res) => {
    res.send('Server is running');
});

setupWebSocket(io);


app.use('/api/messages', require('./src/routes/chatRoutes'));
app.use('/api/upload', require('./src/routes/uploadRoutes'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
