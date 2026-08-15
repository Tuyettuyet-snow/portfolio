import "./Home.css";
import homeImage from "../../assets/Sketch.png";

function Home() {
  return (
    <section id="home" className="home-section">
      {/* 🟢 Đã đổi từ container-fluid thành container chuẩn */}
      <div className="container">
        <div className="row g-0 home-row align-items-center">

          {/* =========================
              LEFT CONTENT
          ========================== */}
          <div className="col-lg-7 col-md-7 col-12">
            <div className="home-left">

              {/* Portfolio Title */}
              <h1 className="portfolio-title">
                PORTFOLIO
              </h1>

              {/* Introduction */}
              <div className="home-info">
                <h2 className="home-role">
                  Multimedia Technology Student
                </h2>

                <p className="home-description">
                  Tôi là sinh viên Công nghệ Đa phương tiện,
                  quan tâm đến phát triển Web, UI/UX Design,
                  Game Artist và các sản phẩm Multimedia.
                </p>

                <p className="home-major">
                  Chuyên ngành: Công Nghệ Đa Phương Tiện
                </p>

                {/* Buttons */}
                <div className="home-buttons">
                  <a href="#projects" className="btn-project">
                    Xem dự án
                  </a>

                  {/* 🟢 Đã sửa đường dẫn file CV trong public/ */}
                  <a
                    href="/CV.pdf"
                    className="btn-cv"
                    download
                  >
                    Tải CV
                  </a>
                </div>

              </div>

            </div>
          </div>

          {/* =========================
              RIGHT IMAGE
          ========================== */}
          <div className="col-lg-5 col-md-5 col-12">
            <div className="home-right">
              <img
                src={homeImage}
                alt="Portfolio illustration"
                className="home-image"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Home;