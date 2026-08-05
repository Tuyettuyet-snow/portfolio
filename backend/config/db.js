// backend/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Kết nối tới Database tên là 'portfolio_db' ở MongoDB Local
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/portfolio_db");
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;