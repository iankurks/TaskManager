import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>© 2026 Ankur | Task Manager App</p>

        <div className="footer-links" style={{fontColor:'white'}}>
          <Link to="/contact">Contact Me</Link>
        </div>
      </div>
    </footer>
  );
}
