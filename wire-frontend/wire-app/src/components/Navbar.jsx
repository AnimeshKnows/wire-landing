import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { isLoggedIn, clearToken } from "../utils/auth";
import styles from "./Navbar.module.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();

  const closeMenu = () => setMenuOpen(false);

  const handleServicesClick = (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      setServicesOpen(!servicesOpen);
    }
  };

  const handleLogout = () => {
    clearToken();
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className={styles.nav}>
      <a href="#home" className={styles.navLogo}>WIRE<span>.</span></a>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`} id="navLinks">
        <li><a href="#home" onClick={closeMenu}>Home</a></li>
        <li><a href="#features" onClick={closeMenu}>Features</a></li>
        <li className={`${styles.navDropdown} ${servicesOpen ? styles.open : ""}`} id="servicesDropdown">
          <a href="#services" onClick={handleServicesClick}>Services</a>
          <div className={styles.dropdownMenu}>
            <a href="#services" onClick={closeMenu}><i className="fa-solid fa-satellite-dish"></i> &nbsp;P2P Relay</a>
            <a href="#services" onClick={closeMenu}><i className="fa-solid fa-shield-halved"></i> &nbsp;End-to-End Encryption</a>
            <a href="#services" onClick={closeMenu}><i className="fa-solid fa-code"></i> &nbsp;Developer API</a>
            <a href="#services" onClick={closeMenu}><i className="fa-solid fa-chart-line"></i> &nbsp;Analytics</a>
          </div>
        </li>
        <li><Link to="/submissions" onClick={closeMenu}>Submissions</Link></li>
        <li><Link to="/tasks" onClick={closeMenu}>Tasks</Link></li>
        {loggedIn ? (
          <li>
            <a href="#logout" className={styles.navCta} onClick={(e) => { e.preventDefault(); handleLogout(); }}>
              Logout
            </a>
          </li>
        ) : (
          <li><Link to="/login" className={styles.navCta} onClick={closeMenu}>Login</Link></li>
        )}
      </ul>

      <button
        className={styles.hamburger}
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