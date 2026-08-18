import "./About.css";
import aboutImage from "../../assets/about.png"; // Ảnh đại diện chính của bạn

function About() {
  const skills = [
    {
      icon: "bi-code-slash",
      title: "Frontend",
      description: "HTML, CSS, JavaScript, React, Bootstrap 5",
    },
    {
      icon: "bi-server",
      title: "Backend",
      description: "Node.js, Express, REST API, Database",
    },
    {
      icon: "bi-vector-pen",
      title: "UI / UX",
      description: "Figma, Wireframe, Prototype, Responsive Design",
    },
    {
      icon: "bi-box",
      title: "3D & Multimedia",
      description: "Blender, Animation, Video Editing",
    },
  ];

  const galleryImages = [
    { 
      id: 1, 
      img: "src/assets/6.jpg", 
      caption: "Khoảnh khắc sáng tạo" 
    },
    { 
      id: 2, 
      img: "src/assets/7.jpg", 
      caption: "Hậu trường làm đồ án" 
    },
    { 
      id: 3, 
      img: "src/assets/8.jpg", 
      caption: "Đam mê thiết kế & 3D" 
    },
  ];

  const clubActivities = [
    {
      title: "Ban Sự kiện",
      role: "Lên ý tưởng, tổ chức và điều phối các hoạt động",
      description: "Tham gia thiết kế ấn phẩm Key Visual, poster và dựng video recap cho các hoạt động lớn của trường/khoa.",
      icon: "bi-camera-reels",
    },
    {
      title: "BLL sinh viên Thanh Hóa - Đại học Kiến trúc Hà Nội",
      role: "Thành viên tích cực",
      description: "Cùng đồng đội phát triển các project web thực chiến, chia sẻ kiến thức về React và UI/UX.",
      icon: "bi-laptop",
    },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">

        {/* ================= PHẦN 1: PROFILE CHÍNH ================= */}
        <div className="row about-wrapper align-items-center">
          <div className="col-lg-5 col-md-5">
            <div className="about-left">
              <div className="about-image-frame">
                <div className="about-image-wrapper">
                  <img
                    src={aboutImage}
                    alt="Lê Thị Tuyết"
                    className="about-image"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7 col-md-7">
            <div className="about-right">
              <div className="about-title">
                <span className="section-number">01</span>
                <h2>About Me</h2>
              </div>

              <h1 className="about-name">Lê Thị Tuyết</h1>

              <div className="about-intro">
                <p>
                  Tôi là sinh viên ngành Công nghệ Đa phương tiện, có kỹ năng
                  về Frontend, Backend, UI/UX, Software Testing/QA và 3D/Game
                  Art. Tôi sử dụng các công nghệ như HTML, CSS, JavaScript,
                  React, Bootstrap 5, Node.js, Express, REST API, Database,
                  Figma và Blender.
                </p>
                <p>
                  Tôi yêu thích kết hợp lập trình, thiết kế và sáng tạo để xây
                  dựng những sản phẩm kỹ thuật số trực quan, tương tác và có
                  trải nghiệm tốt.
                </p>
              </div>

              <div className="about-skills">
                {skills.map((skill) => (
                  <div className="skill-card" key={skill.title}>
                    <div className="skill-icon">
                      <i className={`bi ${skill.icon}`}></i>
                    </div>
                    <div className="skill-content">
                      <h3>{skill.title}</h3>
                      <p>{skill.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= PHẦN 2: KHO ẢNH CÁ NHÂN & ĐỜI SỐNG ================= */}
        <div className="extra-section-block">
          <div className="section-sub-header text-center">
            <span className="section-number">02</span>
            <h2>Khoảnh Khắc & Đời Sống</h2>
            <p className="sub-desc">Một chút hình ảnh về góc làm việc và năng lượng mỗi ngày ✨</p>
          </div>

          <div className="row g-4">
            {galleryImages.map((item) => (
              <div className="col-lg-4 col-md-4" key={item.id}>
                <div className="gallery-card">
                  <img src={item.img} alt={item.caption} />
                  <div className="gallery-overlay">
                    <span>{item.caption}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= PHẦN 3: HOẠT ĐỘNG CÂU LẠC BỘ ================= */}
        <div className="extra-section-block">
          <div className="section-sub-header text-center">
            <span className="section-number">03</span>
            <h2>Hoạt Động Câu Lạc Bộ</h2>
            <p className="sub-desc">Nơi rèn luyện kỹ năng mềm, tinh thần đồng đội và trải nghiệm thực tế</p>
          </div>

          <div className="row g-4">
            {clubActivities.map((club, index) => (
              <div className="col-lg-6 col-md-6" key={index}>
                <div className="club-card">
                  <div className="club-icon-wrap">
                    <i className={`bi ${club.icon}`}></i>
                  </div>
                  <div>
                    <span className="club-role">{club.role}</span>
                    <h3>{club.title}</h3>
                    <p>{club.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= PHẦN 4: GÓC VIDEO SÁNG TẠO (KHUNG RỘNG TO) ================= */}
        <div className="extra-section-block">
          <div className="section-sub-header text-center">
            <span className="section-number">04</span>
            <h2>Góc Video / Sáng Tạo Nội Dung</h2>
            <p className="sub-desc">Chia sẻ hành trình học tập, làm đồ án và cuộc sống sinh viên</p>
          </div>

          <div className="row justify-content-center">
            {/* Sử dụng col-lg-10 để khung video to và trải rộng hơn */}
            <div className="col-lg-10 col-md-12">
              <div className="video-display-card wide-video-card">
                <video 
                  src="/Video_GTBT.mp4" 
                  poster="src/assets/anh_video.jpg"
                  controls 
                  className="w-100"
                />
                <div className="video-card-caption">
                  <div className="tiktok-logo-badge">
                    <i className="bi bi-play-fill"></i>
                  </div>
                  <div>
                    <h4>Giới thiệu bản thân & Đồ án Multimedia 🎬</h4>
                    <p>Bấm phát để xem video chia sẻ quá trình làm việc và thiết kế của mình nhé!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;