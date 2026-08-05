const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());

app.use(express.json());


// ========================================
// TEST MỌI REQUEST
// ========================================

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
    pass: process.env.EMAIL_PASSWORD,
  },

});


// ========================================
// TEST GMAIL CONNECTION
// ========================================

transporter.verify((error, success) => {

  if (error) {

    console.error("❌ GMAIL ERROR:");
    console.error(error.message);

  } else {

    console.log("✅ GMAIL READY");

  }

});


// ========================================
// TEST API
// ========================================

app.get("/api", (req, res) => {

  console.log("API /api được gọi");

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

  console.log("Dữ liệu:", req.body);


  try {

    const {
      name,
      email,
      message,
    } = req.body;


    // ========================================
    // KIỂM TRA DỮ LIỆU
    // ========================================

    if (!name || !email || !message) {

      return res.status(400).json({

        success: false,

        message:
          "Vui lòng nhập đầy đủ thông tin.",

      });

    }


    // ========================================
    // GỬI EMAIL
    // ========================================

    const info = await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: process.env.EMAIL_USER,

      replyTo: email,

      subject:
        `Portfolio Contact: ${name}`,

      text: `
Có người liên hệ từ Portfolio.

Tên: ${name}

Email: ${email}

Nội dung:

${message}
      `,

    });


    // ========================================
    // LOG THÀNH CÔNG
    // ========================================

    console.log("✅ EMAIL ĐÃ GỬI!");

    console.log(
      "Message ID:",
      info.messageId
    );


    // ========================================
    // RESPONSE
    // ========================================

    res.status(200).json({

      success: true,

      message:
        "Email gửi thành công!",

    });


  } catch (error) {

    console.error("❌ LỖI GỬI EMAIL:");

    console.error(error);

    res.status(500).json({

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

  console.log("--------------------------------");

  console.log(
    `SERVER RUNNING`
  );

  console.log(
    `http://localhost:${PORT}`
  );

  console.log("--------------------------------");

});