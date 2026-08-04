import styles from "./Services.module.css";

function Services() {
  return (
    <section id="services" className={styles.services}>
      <div className="section-label">What We Offer</div>
      <h2 className="section-title">Services &amp;<br />Integrations</h2>
      <p className="section-sub">
        From raw WebRTC infrastructure to plug-and-play SDKs — pick what fits your stack.
      </p>

      <div className={styles.servicesList}>
        <div className={styles.serviceRow}>
          <i className="fa-solid fa-satellite-dish"></i>
          <h4>P2P Relay Engine</h4>
          <p>Core WebRTC signaling and relay infrastructure. Works with any frontend framework.</p>
          <span className={styles.serviceTag}>Core</span>
        </div>
        <div className={styles.serviceRow}>
          <i className="fa-solid fa-comments"></i>
          <h4>Real-time Chat SDK</h4>
          <p>Drop-in messaging component with delivery receipts, typing indicators, and offline queuing.</p>
          <span className={styles.serviceTag}>SDK</span>
        </div>
        <div className={styles.serviceRow}>
          <i className="fa-solid fa-video"></i>
          <h4>Video &amp; Voice Calls</h4>
          <p>Adaptive bitrate video streams with noise suppression and bandwidth-aware quality switching.</p>
          <span className={styles.serviceTag}>Beta</span>
        </div>
        <div className={styles.serviceRow}>
          <i className="fa-solid fa-chart-line"></i>
          <h4>Connection Analytics</h4>
          <p>Real-time dashboards for ICE candidate success rates, jitter, and peer geography heatmaps.</p>
          <span className={styles.serviceTag}>Pro</span>
        </div>
      </div>
    </section>
  );
}

export default Services;