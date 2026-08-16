const { sendContactEmail } = require("../services/emailService");

// Regex kiểm tra định dạng email chuẩn
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sendContact = (req, res) => {
  console.log("\n========== CONTACT REQUEST ==========");
  console.log("DATA:", req.body);

  const { name, email, message } = req.body;

  // Cắt bỏ khoảng trắng thừa đầu/cuối của chuỗi
  const cleanName = name ? String(name).trim() : "";
  const cleanEmail = email ? String(email).trim() : "";
  const cleanMessage = message ? String(message).trim() : "";

  // 1. Kiểm tra trường rỗng
  if (!cleanName || !cleanEmail || !cleanMessage) {
    console.log("Thiếu dữ liệu");
    return res.status(400).json({
      success: false,
      message: "Vui lòng nhập đầy đủ các trường thông tin.",
    });
  }

  // 2. Kiểm tra định dạng Email
  if (!EMAIL_REGEX.test(cleanEmail)) {
    console.log("Email không hợp lệ:", cleanEmail);
    return res.status(400).json({
      success: false,
      message: "Địa chỉ email không hợp lệ (Ví dụ: example@gmail.com).",
    });
  }

  // 3. Kiểm tra độ dài Họ và tên (2 - 50 ký tự)
  if (cleanName.length < 2 || cleanName.length > 50) {
    console.log("Độ dài Name không chuẩn:", cleanName.length);
    return res.status(400).json({
      success: false,
      message: "Họ và tên phải có độ dài từ 2 đến 50 ký tự.",
    });
  }

  // 4. Kiểm tra độ dài Nội dung tin nhắn (10 - 1000 ký tự)
  if (cleanMessage.length < 10 || cleanMessage.length > 1000) {
    console.log("Độ dài Message không chuẩn:", cleanMessage.length);
    return res.status(400).json({
      success: false,
      message: "Nội dung tin nhắn phải từ 10 đến 1000 ký tự.",
    });
  }

  //  5. PHẢN HỒI THÀNH CÔNG NGAY CHO FRONTEND (< 0.1s)
  res.status(200).json({
    success: true,
    message: "Gửi liên hệ thành công!",
  });

  // ⚡ 6. XỬ LÝ GỬI EMAIL NGẦM BẰNG SETIMMEDIATE
  setImmediate(async () => {
    try {
      await sendContactEmail({
        name: cleanName,
        email: cleanEmail,
        message: cleanMessage,
      });
      console.log("====================================");
    } catch (error) {
      console.error(" [Background Mail Error]:", error.message);
      console.log("====================================");
    }
  });
};

module.exports = {
  sendContact,
};