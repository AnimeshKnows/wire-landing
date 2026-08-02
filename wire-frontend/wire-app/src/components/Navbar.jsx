import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleServicesClick = (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setServicesOpen(!servicesOpen);
    }
  };

  return (
    <nav>
      <a href="#home" className="nav-logo">WIRE<span>.</span></a>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`} id="navLinks">
        <li><a href="#home" onClick={closeMenu}>Home</a></li>
        <li><a href="#features" onClick={closeMenu}>Features</a></li>
        <li className={`nav-dropdown ${servicesOpen ? "open" : ""}`} id="servicesDropdown">
          <a href="#services" onClick={handleServicesClick}>Services</a>
          <div className="dropdown-menu">
            <a href="#services" onClick={closeMenu}><i className="fa-solid fa-satellite-dish"></i> &nbsp;P2P Relay</a>
            <a href="#services" onClick={closeMenu}><i className="fa-solid fa-shield-halved"></i> &nbsp;End-to-End Encryption</a>
            <a href="#services" onClick={closeMenu}><i className="fa-solid fa-code"></i> &nbsp;Developer API</a>
            <a href="#services" onClick={closeMenu}><i className="fa-solid fa-chart-line"></i> &nbsp;Analytics</a>
          </div>
        </li>
        <li><Link to="/submissions" onClick={closeMenu}>Submissions</Link></li>
        <li><a href="#contact" className="nav-cta" onClick={closeMenu}>Get Access</a></li>
      </ul>

      <button
        className="hamburger"
        id="hamburger"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}

export default Navbar;