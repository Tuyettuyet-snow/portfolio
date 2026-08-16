const nodemailer = require("nodemailer");

// Lọc ký tự đặc biệt chống mã độc HTML (XSS)
const escapeHtml = (str = "") => {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Khởi tạo Transporter Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true, // Bật Connection Pool tối ưu tốc độ gửi
  maxConnections: 5,
  maxMessages: 100,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD,
  },
  connectionTimeout: 10000,
  socketTimeout: 10000,
});

// Kiểm tra trạng thái kết nối Gmail SMTP
const verifyEmail = async () => {
  if (!process.env.EMAIL_USER || !(process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD)) {
    console.error("🔴 Gmail SMTP ERROR: Thiếu EMAIL_USER hoặc EMAIL_PASS/EMAIL_PASSWORD trong file .env");
    return;
  }

  try {
    await transporter.verify();
    console.log("🟢 Gmail SMTP connection: OK");
  } catch (error) {
    console.error("🔴 Gmail SMTP connection ERROR:", error.message);
  }
};

// Xử lý gửi email liên hệ
const sendContactEmail = async ({ name, email, message }) => {
  console.log("⚡ [Background] Đang xử lý gửi email...");

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `📩 [Portfolio] Liên hệ mới từ ${safeName}`,
    text: `CÓ LIÊN HỆ MỚI TỪ PORTFOLIO\n\nHọ tên: ${name}\nEmail: ${email}\n\nNội dung:\n${message}`,
    html: `
      <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #111827; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 600;">📩 CÓ LIÊN HỆ MỚI TỪ PORTFOLIO</h2>
        </div>
        <div style="padding: 24px; color: #374151; line-height: 1.6;">
          <p style="margin-top: 0;"><strong>Họ và tên:</strong> ${safeName}</p>
          <p><strong>Email liên hệ:</strong> <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">${safeEmail}</a></p>
          <hr style="border: none; border-top: 1px solid #f3f4f6; margin: 20px 0;" />
          <p style="margin-bottom: 8px;"><strong>Nội dung tin nhắn:</strong></p>
          <div style="background-color: #f9fafb; padding: 16px; border-radius: 6px; border-left: 4px solid #2563eb; font-size: 14px; white-space: pre-wrap; word-break: break-word;">${safeMessage}</div>
        </div>
        <div style="background-color: #f9fafb; padding: 12px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6;">
          Email này được gửi tự động từ Portfolio Website.
        </div>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ [Background] Email đã gửi thành công! ID:", info.messageId);
  return info;
};

module.exports = {
  sendContactEmail,
  verifyEmail,
};