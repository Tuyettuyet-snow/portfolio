const { sendContactEmail } = require("../services/emailService");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sendContact = async (req, res) => {
  console.log("\n========== CONTACT REQUEST ==========");
  console.log("DATA:", req.body);

  const { name, email, message } = req.body;

  const cleanName = name ? String(name).trim() : "";
  const cleanEmail = email ? String(email).trim() : "";
  const cleanMessage = message ? String(message).trim() : "";

  // 1. Validation dữ liệu
  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập đầy đủ các trường thông tin.",
    });
  }

  if (!EMAIL_REGEX.test(cleanEmail)) {
    return res.status(400).json({
      success: false,
      message: "Địa chỉ email không hợp lệ.",
    });
  }

  if (cleanName.length < 2 || cleanName.length > 50) {
    return res.status(400).json({
      success: false,
      message: "Họ và tên phải có độ dài từ 2 đến 50 ký tự.",
    });
  }

  if (cleanMessage.length < 10 || cleanMessage.length > 1000) {
    return res.status(400).json({
      success: false,
      message: "Nội dung tin nhắn phải từ 10 đến 1000 ký tự.",
    });
  }

  // 🟢 2. GỬI MAIL TRỰC TIẾP (Chờ Gmail xác nhận xong mới báo về Web)
  try {
    await sendContactEmail({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    });

    console.log("✅ Mail đã được Gmail xác nhận gửi thành công!");
    return res.status(200).json({
      success: true,
      message: "Gửi liên hệ thành công!",
    });
  } catch (error) {
    console.error("❌ Mail Error:", error.message);
    
    // Nếu sai App Password hoặc lỗi Gmail, Web sẽ báo đỏ ngay lập tức thay vì báo ảo
    return res.status(500).json({
      success: false,
      message: "Lỗi hệ thống gửi email. Vui lòng thử lại sau!",
    });
  }
};

module.exports = {
  sendContact,
};