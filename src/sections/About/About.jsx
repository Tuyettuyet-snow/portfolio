import "./About.css";
import aboutImage from "../../assets/about.png";

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
      description: "Node.js, Express, REST API, JWT, Database",
    },
    {
      icon: "bi-vector-pen",
      title: "UI / UX",
      description: "Figma, Wireframe, Prototype, Responsive Design",
    },
    {
      icon: "bi-box",
      title: "3D & Multimedia",
      description: "Blender, 3D Modeling, Animation, Video Editing",
    },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">

        <div className="row about-wrapper align-items-center">

          {/* =========================
              LEFT - IMAGE
          ========================== */}
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


          {/* =========================
              RIGHT - CONTENT
          ========================== */}
          <div className="col-lg-7 col-md-7">

            <div className="about-right">

              {/* TITLE */}
              <div className="about-title">
                <span className="section-number">
                  01
                </span>

                <h2>
                  About Me
                </h2>
              </div>


              {/* NAME */}
              <h1 className="about-name">
                Lê Thị Tuyết
              </h1>


              {/* INTRO */}
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


              {/* SKILLS */}
              <div className="about-skills">

                {skills.map((skill) => (
                  <div
                    className="skill-card"
                    key={skill.title}
                  >

                    <div className="skill-icon">
                      <i className={`bi ${skill.icon}`}></i>
                    </div>

                    <div className="skill-content">
                      <h3>
                        {skill.title}
                      </h3>

                      <p>
                        {skill.description}
                      </p>
                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;