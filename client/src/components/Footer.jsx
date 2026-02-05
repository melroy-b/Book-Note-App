import { GitHub, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Left: Name */}
        <span className="small">
          © {new Date().getFullYear()} Melroy Barreto
        </span>

        {/* Right: Social icons */}
        <div className="d-flex gap-3">
          <a
            href="https://www.linkedin.com/in/melroy-barreto/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
          >
            <LinkedIn />
          </a>

          <a
            href="https://https://github.com/melroy-b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
          >
            <GitHub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
