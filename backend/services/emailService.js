const nodemailer = require("nodemailer");


// =================================
// CREATE TRANSPORTER
// =================================

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

});


// =================================
// TEST GMAIL CONNECTION
// =================================

const verifyEmail = async () => {

  try {

    await transporter.verify();

    console.log(
      "Gmail SMTP connection: OK"
    );

  } catch (error) {

    console.error(
      "Gmail SMTP connection ERROR:"
    );

    console.error(error.message);

  }

};


// =================================
// SEND EMAIL
// =================================

const sendContactEmail = async ({
  name,
  email,
  message,
}) => {

  console.log(
    "Đang gửi email..."
  );

  const info =
    await transporter.sendMail({

      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,

      to: process.env.EMAIL_USER,

      replyTo: email,

      subject:
        `Portfolio Contact - ${name}`,

      html: `
        <div style="
          font-family: Arial;
          max-width: 600px;
          margin: auto;
        ">

          <h2>
            📩 Có liên hệ mới từ Portfolio
          </h2>

          <hr />

          <p>
            <strong>Họ tên:</strong>
            ${name}
          </p>

          <p>
            <strong>Email:</strong>
            ${email}
          </p>

          <p>
            <strong>Nội dung:</strong>
          </p>

          <p>
            ${message}
          </p>

        </div>
      `,

    });

  console.log(
    "Email sent:",
    info.messageId
  );

};


module.exports = {
  sendContactEmail,
  verifyEmail,
};