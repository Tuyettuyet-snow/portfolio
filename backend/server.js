const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sendContact } = require("./controllers/contactController");
const { verifyEmail } = require("./services/emailService");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

// Kiểm tra kết nối SMTP khi bật Server
verifyEmail();

// Routes
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio API is running",
  });
});

// Route Contact chuyển trực tiếp sang controller tối ưu
app.post("/api/contact", sendContact);

// Server Listen
app.listen(PORT, () => {
  console.log(`--------------------------------`);
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
  console.log(`--------------------------------`);
});