const express = require("express");
const rateLimit = require("express-rate-limit");
const { sendContact } = require("../controllers/contactController");

const router = express.Router();

//  Cấu hình chống Spam Bot (Giới hạn 3 lần gửi/15 phút cho mỗi IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Khung thời gian: 15 phút
  max: 3, // Tối đa 3 lượt request thành công hoặc thất bại từ 1 IP
  message: {
    success: false,
    message: "Bạn đã gửi liên hệ quá nhiều lần. Vui lòng thử lại sau 15 phút!",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Áp dụng contactLimiter trước khi gọi controller sendContact
router.post("/", contactLimiter, sendContact);

module.exports = router;