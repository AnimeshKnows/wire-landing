import { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [notice, setNotice] = useState({ text: "", color: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    // Validation
    if (!name) {
      setNotice({ text: "✗ Name is required.", color: "#ef4444" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNotice({ text: "✗ Please enter a valid email address.", color: "#ef4444" });
      return;
    }
    if (!message) {
      setNotice({ text: "✗ Message is required.", color: "#ef4444" });
      return;
    }

    // LocalStorage persistence
    const entry = { name, email, message, timestamp: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("wire_submissions") || "[]");
    existing.push(entry);
    localStorage.setItem("wire_submissions", JSON.stringify(existing));

    setNotice({ text: `✓ Got it, ${name}! We'll be in touch soon.`, color: "#06b6d4" });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact">
      <div className="section-label">Get In Touch</div>
      <div className="contact-wrap">
        <div className="contact-info">
          <h3>Ready to go<br />server-free?</h3>
          <p>
            Apply for early access or reach out for partnership inquiries, API questions, or just to say hi.
          </p>
          <div className="contact-detail">
            <i className="fa-solid fa-envelope"></i> hello@wire-engine.dev
          </div>
          <div className="contact-detail">
            <i className="fa-brands fa-github"></i> github.com/wire-engine
          </div>
          <div className="contact-detail">
            <i className="fa-solid fa-location-dot"></i> Lucknow, India
          </div>
        </div>

        <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell us what you're building..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="form-submit">
            <i className="fa-solid fa-paper-plane"></i> &nbsp;Send Message
          </button>
          <p className="form-notice" id="formNotice" style={{ color: notice.color }}>
            {notice.text}
          </p>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;