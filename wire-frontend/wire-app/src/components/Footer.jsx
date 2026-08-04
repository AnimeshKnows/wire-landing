import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>WIRE<span>.</span></div>
      <p className={styles.footerCopy}>© 2025 WIRE – WebRTC Instant Relay Engine. All rights reserved.</p>
      <ul className={styles.footerLinks}>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </footer>
  );
}

export default Footer;