const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {
    try {
    const uri = process.env.MONGODB_URI; 
    if (!uri) {
        throw new Error('MongoDB URI is not defined in .env file');
    }

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
    }
};

module.exports = { connectDB };
