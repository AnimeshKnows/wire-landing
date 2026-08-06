import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveToken } from "../utils/auth";

function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [notice, setNotice] = useState({ text: "", color: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = formData.username.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!username) {
      setNotice({ text: "✗ Username is required.", color: "#ef4444" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNotice({ text: "✗ Please enter a valid email address.", color: "#ef4444" });
      return;
    }
    if (!password || password.length < 6) {
      setNotice({ text: "✗ Password must be at least 6 characters.", color: "#ef4444" });
      return;
    }

    setSubmitting(true);
    setNotice({ text: "Registering...", color: "#64748b" });

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Registration failed.");
      }

      setNotice({ text: "✓ Registered! Logging you in...", color: "#06b6d4" });

      // Auto-login after successful registration
      const loginRes = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!loginRes.ok) {
        throw new Error("Registered, but auto-login failed. Please log in manually.");
      }

      const data = await loginRes.json();
      saveToken(data.token);
      navigate("/tasks");
    } catch (err) {
      setNotice({ text: `✗ ${err.message}`, color: "#ef4444" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "8rem 2rem 4rem" }}>
      <Link
        to="/"
        style={{
          display: "inline-block",
          fontFamily: "var(--mono)",
          fontSize: "0.75rem",
          color: "var(--wire)",
          textDecoration: "none",
          marginBottom: "1.5rem",
        }}
      >
        ← Back to Home
      </Link>

      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1.5rem" }}>Register</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <label
            htmlFor="username"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              fontFamily: "var(--mono)",
              fontSize: "0.82rem",
              padding: "0.75rem 1rem",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <label
            htmlFor="email"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              fontFamily: "var(--mono)",
              fontSize: "0.82rem",
              padding: "0.75rem 1rem",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <label
            htmlFor="password"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              fontFamily: "var(--mono)",
              fontSize: "0.82rem",
              padding: "0.75rem 1rem",
              outline: "none",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.78rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "0.85rem 2rem",
            background: "var(--wire)",
            color: "#fff",
            border: "none",
            cursor: submitting ? "not-allowed" : "pointer",
            opacity: submitting ? 0.6 : 1,
            alignSelf: "flex-start",
          }}
        >
          {submitting ? "Registering..." : "Register"}
        </button>

        <p style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: notice.color, marginTop: "0.5rem" }}>
          {notice.text}
        </p>

        <p style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--muted)" }}>
          Already have an account? <Link to="/login" style={{ color: "var(--wire)" }}>Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;