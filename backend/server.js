const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ========================================
// MIDDLEWARE & CORS CONFIG
// ========================================

// Cấu hình CORS mở rộng cho Vercel & Localhost
app.use(
  cors({
    origin: "*", // Hoặc chỉ định domain Vercel: "https://portfolio-tuyettuyet.vercel.app"
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log("================================");
  console.log("REQUEST:", req.method, req.url);
  console.log("BODY:", req.body);
  console.log("================================");
  next();
});

// ========================================
// GMAIL TRANSPORTER
// ========================================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Lưu ý: Phải là App Password (Mật khẩu ứng dụng)
  },
});

// ========================================
// HEALTH CHECK API
// ========================================

app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio API is running",
  });
});

// ========================================
// CONTACT API
// ========================================

app.post("/api/contact", async (req, res) => {
  console.log("📩 CONTACT API ĐƯỢC GỌI!");

  try {
    const { name, email, message } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập đầy đủ thông tin.",
      });
    }

    // Gửi Email
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `Có người liên hệ từ Portfolio.\n\nTên: ${name}\nEmail: ${email}\n\nNội dung:\n${message}`,
    });

    console.log("✅ EMAIL ĐÃ GỬI! Message ID:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Email gửi thành công!",
    });
  } catch (error) {
    console.error("❌ LỖI GỬI EMAIL:", error);

    return res.status(500).json({
      success: false,
      message: "Lỗi gửi email",
      error: error.message,
    });
  }
});

// ========================================
// SERVER
// ========================================

app.listen(PORT, () => {
  console.log(`--------------------------------`);
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
  console.log(`--------------------------------`);
});