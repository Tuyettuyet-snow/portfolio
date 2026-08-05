// backend/models/Contact.js
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Vui lòng nhập email"],
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: [true, "Vui lòng nhập nội dung"],
    },
  },
  {
    timestamps: true, // Tự động lưu thời gian gửi (createdAt, updatedAt)
  }
);

module.exports = mongoose.model("Contact", contactSchema);