import { useState } from "react";
import styles from "./ContactForm.module.css";
import { API_BASE_URL } from "../config";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [notice, setNotice] = useState({ text: "", color: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

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

    setSubmitting(true);
    setNotice({ text: "Sending...", color: "#64748b" });

    try {
      const res = await fetch(`${API_BASE_URL}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      setNotice({ text: `✓ Got it, ${name}! We'll be in touch soon.`, color: "#06b6d4" });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setNotice({ text: "✗ Something went wrong. Please try again.", color: "#ef4444" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact">
      <div className="section-label">Get In Touch</div>
      <div className={styles.contactWrap}>
        <div className={styles.contactInfo}>
          <h3>Ready to go<br />server-free?</h3>
          <p>
            Apply for early access or reach out for partnership inquiries, API questions, or just to say hi.
          </p>
          <div className={styles.contactDetail}>
            <i className="fa-solid fa-envelope"></i> hello@wire-engine.dev
          </div>
          <div className={styles.contactDetail}>
            <i className="fa-brands fa-github"></i> github.com/wire-engine
          </div>
          <div className={styles.contactDetail}>
            <i className="fa-solid fa-location-dot"></i> Lucknow, India
          </div>
        </div>

        <form className={styles.contactForm} id="contactForm" onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
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
          <div className={styles.formGroup}>
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
          <div className={styles.formGroup}>
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
          <button type="submit" className={styles.formSubmit} disabled={submitting}>
            <i className="fa-solid fa-paper-plane"></i> &nbsp;{submitting ? "Sending..." : "Send Message"}
          </button>
          <p className={styles.formNotice} id="formNotice" style={{ color: notice.color }}>
            {notice.text}
          </p>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;