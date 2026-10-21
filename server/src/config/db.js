const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skb_travels', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`[MongoDB Connection Error] ${error.message}`);
    console.warn(`[MongoDB Warning] Server will continue running, but database operations will be offline/fallback mode.`);
    return false;
  }
};

module.exports = connectDB;
