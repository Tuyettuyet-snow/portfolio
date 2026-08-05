import "./FloatingContact.css";

function FloatingContact() {
  return (
    <div className="floating-contact">

      {/* Email */}
      <a
        href="mailto:lethituyet2005ht@gmail.com"
        className="floating-contact-item"
        aria-label="Email"
        title="Email"
      >
        <i className="bi bi-envelope-fill"></i>
      </a>

      {/* GitHub */}
      <a
        href="https://github.com/Tuyettuyet-snow"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact-item"
        aria-label="GitHub"
        title="GitHub"
      >
        <i className="bi bi-github"></i>
      </a>

      {/* Zalo */}
      <a
        href="https://zalo.me/0372027488"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact-item"
        aria-label="Zalo"
        title="Zalo"
      >
        <i className="bi bi-chat-dots-fill"></i>
      </a>

    </div>
  );
}

export default FloatingContact;