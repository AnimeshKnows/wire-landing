import styles from "./Features.module.css";

function Features() {
  return (
    <section id="features" className={styles.features}>
      <div className="section-label">Core Capabilities</div>
      <h2 className="section-title">Built different.<br />By design.</h2>
      <p className="section-sub">
        Every layer of WIRE is engineered for speed, privacy, and developer ergonomics — from signaling to data channels.
      </p>

      <div className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}><i className="fa-solid fa-bolt"></i></div>
          <h3>Instant Relay</h3>
          <p>Sub-50ms peer connections via optimized ICE negotiation and STUN/TURN fallback. No cold starts.</p>
          <div className={styles.featureNum}>01</div>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}><i className="fa-solid fa-shield-halved"></i></div>
          <h3>Zero-Trust E2EE</h3>
          <p>All data channels are encrypted end-to-end using DTLS-SRTP. Not even WIRE can read your messages.</p>
          <div className={styles.featureNum}>02</div>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}><i className="fa-solid fa-expand"></i></div>
          <h3>Mesh Scalable</h3>
          <p>From 1-on-1 chats to multi-peer mesh networks. Dynamic topology management built in.</p>
          <div className={styles.featureNum}>03</div>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}><i className="fa-solid fa-code"></i></div>
          <h3>Dev-First API</h3>
          <p>Three lines to connect two peers. Full TypeScript types, hooks for React, and Firebase-ready signaling.</p>
          <div className={styles.featureNum}>04</div>
        </div>
      </div>
    </section>
  );
}

export default Features;