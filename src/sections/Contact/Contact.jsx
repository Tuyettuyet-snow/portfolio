import { useState, useEffect } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  // Tự động ẩn thông báo trạng thái sau 5 giây
  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT FORM
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus({ type: "", message: "" });

    // 🟢 TỰ ĐỘNG CHỌN URL: Nếu chạy localhost thì gọi port 5000, ngược lại gọi Render
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const defaultUrl = isLocalhost ? "http://localhost:5000" : "https://portfolio-le-thi-tuyet.onrender.com";
    
    const rawApiUrl = import.meta.env.VITE_API_URL || defaultUrl;
    const API_URL = rawApiUrl.replace(/\/$/, "");

    console.log("🚀 Đang gửi request tới API:", `${API_URL}/api/contact`);

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let result = {};
      try {
        result = await response.json();
      } catch (jsonErr) {
        console.warn("Response không phải JSON:", jsonErr);
      }

      if (response.ok && result.success) {
        setStatus({
          type: "success",
          message: result.message || "Gửi tin nhắn thành công!",
        });

        // Xóa form sau khi gửi thành công
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message: result.message || `Lỗi máy chủ (${response.status}). Vui lòng thử lại!`,
        });
      }
    } catch (error) {
      console.error("Lỗi kết nối Backend:", error);
      setStatus({
        type: "error",
        message: "Không thể kết nối tới máy chủ (Vui lòng kiểm tra lại Backend ở port 5000).",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* HEADER */}
        <div className="contact-heading">
          <span className="contact-number">04</span>
          <h2>Contact Me.</h2>
          <p>
            Bạn có dự án, ý tưởng hoặc muốn trao đổi? Hãy liên hệ với tôi.
          </p>
        </div>

        <div className="row contact-wrapper">
          {/* LEFT */}
          <div className="col-lg-5">
            <div className="contact-left">
              <h3>
                Let's work
                <br />
                together.
              </h3>

              <p className="contact-description">
                Tôi luôn sẵn sàng trao đổi về các dự án phát triển Web, UI/UX
                và Multimedia.
              </p>

              {/* CONTACT INFO */}
              <div className="contact-info">
                {/* EMAIL */}
                <a
                  href="mailto:lethituyet2005ht@gmail.com"
                  className="contact-item"
                >
                  <span className="contact-icon">@</span>
                  <span className="contact-item-text">
                    <small>EMAIL</small>
                    <strong>lethituyet2005ht@gmail.com</strong>
                  </span>
                </a>

                {/* GITHUB */}
                <a
                  href="https://github.com/Tuyettuyet-snow"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item"
                >
                  <span className="contact-icon">GH</span>
                  <span className="contact-item-text">
                    <small>GITHUB</small>
                    <strong>github.com/Tuyettuyet-snow</strong>
                  </span>
                </a>

                {/* ZALO */}
                <a
                  href="https://zalo.me/0372027488"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item"
                >
                  <span className="contact-icon">Z</span>
                  <span className="contact-item-text">
                    <small>ZALO</small>
                    <strong>0372 027 488</strong>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT - FORM */}
          <div className="col-lg-7">
            <div className="contact-form-box">
              {/* STATUS */}
              {status.message && (
                <div className={`contact-status ${status.type}`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* NAME */}
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* EMAIL */}
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* MESSAGE */}
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    rows="5"
                    required
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="contact-submit"
                  disabled={loading}
                >
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                  <span className="submit-arrow">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;