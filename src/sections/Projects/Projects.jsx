import { useState } from "react";
import "./Projects.css";

import projectImage from "../../assets/1.png";
import projectImage2 from "../../assets/2.png";
import projectImage3 from "../../assets/3.png";
import projectImage4 from "../../assets/4.png";
import projectImage5 from "../../assets/5.png";

// LƯU Ý: Đã xóa các dòng import video tĩnh để tránh lỗi "Module not found" khi build trên Vercel.

function Projects() {
  /* =========================================
     CATEGORY
  ========================================= */

  const categories = [
    "ALL",
    "WEB",
    "UI/UX",
    "GAME",
    "MULTIMEDIA",
  ];


  /* =========================================
     STATE
  ========================================= */

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);


  /* =========================================
     PAGINATION
  ========================================= */

  const projectsPerPage = 6;


  /* =========================================
     PROJECTS
  ========================================= */

  const projects = [
    {
      id: 1,
      title: "Vegefoods",
      category: "WEB",
      type: "Web Development",
      image: projectImage,
      description:
        "Website bán thực phẩm được xây dựng với giao diện trực quan, responsive và thân thiện với người dùng.",
      skills: [
        "Figma",
        "HTML",
        "CSS",
        "JavaScript",
        "Bootstrap 5",
      ],
      github: "https://github.com/huongxinhgainhat/oragnic_market",
      demo: "#",
    },

    {
      id: 2,
      title: "App nấu ăn thông minh",
      category: "UI/UX",
      type: "UI/UX Design",
      image: projectImage2,
      description:
        "Thiết kế giao diện website bán thực phẩm với phong cách hiện đại, trực quan và thân thiện.",
      skills: [
        "Figma",
        "UI/UX",
        "Wireframe",
        "Prototype",
      ],
      github: "https://github.com/",
      // Thay link video online (Youtube/Drive) hoặc để "#" tại đây
      demo: "https://drive.google.com/drive/folders/1FGVSeMOgJEn97Ua7BvGCmC0wJV4VlXKn?usp=sharing",
    },

    {
      id: 3,
      title: "Vị Bánh Việt - Mobile",
      category: "GAME",
      type: "Game Development",
      image: projectImage3,
      description:
        "Dự án game kết hợp gameplay, thiết kế giao diện và trải nghiệm tương tác dành cho người chơi.",
      skills: [
        "Unity Basic",
        "Artitic Design",
        "Game UI",
        "Gameplay",
      ],
      github: "https://github.com/",
      demo: "https://drive.google.com/drive/folders/1f-47xL8cb5p2qR2RJORn-KyMWzwO9Pjb?usp=sharing",
    },

    {
      id: 4,
      title: "Thiết kế Poster",
      category: "MULTIMEDIA",
      type: "Multimedia",
      image: projectImage4,
      description:
        "Sản phẩm đa phương tiện kết hợp thiết kế hình ảnh, video và nội dung sáng tạo.",
      skills: [
        "Canva",
        "Illustrator",
      ],
      github: "#",
      demo: "https://drive.google.com/drive/folders/13Z07GgOlGER3ovkO3cOOIluuF7QwCp2G?usp=sharing",
    },

    {
      id: 5,
      title: "Parkour Escape",
      category: "MULTIMEDIA",
      type: "Multimedia",
      image: projectImage5,
      description:
        "Sản phẩm đa phương tiện kết hợp thiết kế hình ảnh, video và nội dung sáng tạo.",
      skills: [
        "Blender",
        "Animation-Cascaduer",
        "Editing",
        "Kịch bản",
      ],
      github: "#",
      demo: "https://drive.google.com/drive/folders/1lU2Kenc_e2XpGudZLDR2i4FmVQqgyh0O?usp=sharing",
    },

  ];


  /* =========================================
     FILTER
  ========================================= */

  const filteredProjects =
    activeCategory === "ALL"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );


  /* =========================================
     PAGINATION
  ========================================= */

  const totalPages = Math.ceil(
    filteredProjects.length / projectsPerPage
  );

  const startIndex = (currentPage - 1) * projectsPerPage;

  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + projectsPerPage
  );


  /* =========================================
     CHANGE CATEGORY
  ========================================= */

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };


  /* =========================================
     CHANGE PAGE
  ========================================= */

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: document.getElementById("projects")?.offsetTop || 0,
      behavior: "smooth",
    });
  };


  return (
    <section id="projects" className="projects-section">
      <div className="container">

        {/* HEADER */}
        <div className="projects-heading">
          <span className="projects-number">02</span>
          <h2>My Projects</h2>
          <p>
            Một số dự án tôi đã thực hiện cùng nhóm trong quá trình học tập,
            nghiên cứu và phát triển kỹ năng.
          </p>
        </div>

        {/* FILTER */}
        <div className="projects-filter">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* PROJECT GRID */}
        <div className="row g-4">
          {currentProjects.map((project) => (
            <div
              className="col-xl-4 col-lg-4 col-md-6 col-12"
              key={project.id}
            >
              <article className="project-card">

                {/* IMAGE */}
                <div className="project-image">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                  />
                </div>

                {/* CONTENT */}
                <div className="project-body">
                  <span className="project-type">
                    {project.type}
                  </span>

                  <h3>{project.title}</h3>

                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="project-skills">
                    {project.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>

                  <div className="project-footer">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub <span>↗</span>
                    </a>

                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo <span>↗</span>
                    </a>
                  </div>
                </div>

              </article>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="projects-pagination">
            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  type="button"
                  className={
                    currentPage === page
                      ? "pagination-btn active"
                      : "pagination-btn"
                  }
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              →
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default Projects;