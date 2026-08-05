const {
  sendContactEmail,
} = require("../services/emailService");


// =================================
// CONTACT CONTROLLER
// =================================

const sendContact = async (req, res) => {

  console.log("");
  console.log(
    "========== CONTACT REQUEST =========="
  );

  console.log(
    "DATA:",
    req.body
  );


  try {

    const {
      name,
      email,
      message,
    } = req.body;


    // ===============================
    // VALIDATE
    // ===============================

    if (
      !name ||
      !email ||
      !message
    ) {

      console.log(
        "❌ Thiếu dữ liệu"
      );

      return res.status(400).json({

        success: false,

        message:
          "Vui lòng nhập đầy đủ thông tin",

      });

    }


    // ===============================
    // SEND EMAIL
    // ===============================

    await sendContactEmail({

      name,
      email,
      message,

    });


    // ===============================
    // SUCCESS
    // ===============================

    console.log(
      "✅ GỬI EMAIL THÀNH CÔNG"
    );

    console.log(
      "===================================="
    );


    return res.status(200).json({

      success: true,

      message:
        "Gửi liên hệ thành công",

    });


  } catch (error) {

    // ===============================
    // ERROR
    // ===============================

    console.log(
      "❌ EMAIL ERROR"
    );

    console.error(
      error
    );

    console.log(
      "===================================="
    );


    return res.status(500).json({

      success: false,

      message:
        "Không thể gửi email",

      // Tạm thời để kiểm tra lỗi
      // Sau khi chạy được sẽ xóa
      error:
        error.message,

    });

  }

};


module.exports = {
  sendContact,
};