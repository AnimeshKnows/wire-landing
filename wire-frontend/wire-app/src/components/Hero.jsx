function Hero() {
  return (
    <section id="home">
      <div className="hero-glow"></div>

      {/* Decorative SVG network */}
      <svg className="hero-network" viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="300" cy="250" r="6" fill="#3b82f6" />
        <circle cx="120" cy="100" r="4" fill="#06b6d4" />
        <circle cx="480" cy="130" r="4" fill="#3b82f6" />
        <circle cx="80" cy="350" r="4" fill="#06b6d4" />
        <circle cx="520" cy="370" r="4" fill="#3b82f6" />
        <circle cx="250" cy="420" r="3" fill="#06b6d4" />
        <circle cx="400" cy="60" r="3" fill="#3b82f6" />
        <line x1="300" y1="250" x2="120" y2="100" stroke="#3b82f6" strokeWidth="1" />
        <line x1="300" y1="250" x2="480" y2="130" stroke="#3b82f6" strokeWidth="1" />
        <line x1="300" y1="250" x2="80" y2="350" stroke="#06b6d4" strokeWidth="1" />
        <line x1="300" y1="250" x2="520" y2="370" stroke="#3b82f6" strokeWidth="1" />
        <line x1="300" y1="250" x2="250" y2="420" stroke="#06b6d4" strokeWidth="1" />
        <line x1="120" y1="100" x2="400" y2="60" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="480" y1="130" x2="400" y2="60" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="80" y1="350" x2="250" y2="420" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="520" y1="370" x2="250" y2="420" stroke="#06b6d4" strokeWidth="0.5" strokeDasharray="4 4" />
      </svg>

      <div className="hero-content">
        <div className="hero-tag">Now in Beta &nbsp;·&nbsp; WebRTC Powered</div>

        <h1 className="hero-title">
          Connect Peers.<br />
          <em>No Servers.</em><br />
          No Delay.
        </h1>

        <p className="hero-sub">
          WIRE is a blazing-fast P2P communication engine built on WebRTC.<br />
          Instant relay. Zero infrastructure lock-in. Open protocol.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            <i className="fa-solid fa-bolt"></i> Get Early Access
          </a>
          <a href="#features" className="btn-ghost">
            <i className="fa-solid fa-circle-play"></i> See How It Works
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <div className="stat-num">&lt;50ms</div>
            <div className="stat-label">Avg Latency</div>
          </div>
          <div>
            <div className="stat-num">E2EE</div>
            <div className="stat-label">By Default</div>
          </div>
          <div>
            <div className="stat-num">0</div>
            <div className="stat-label">Central Servers</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;