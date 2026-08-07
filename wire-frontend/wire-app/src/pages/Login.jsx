import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveToken } from "../utils/auth";
import { API_BASE_URL } from "../config";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [notice, setNotice] = useState({ text: "", color: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = formData.username.trim();
    const password = formData.password.trim();

    if (!username || !password) {
      setNotice({ text: "✗ Username and password are required.", color: "#ef4444" });
      return;
    }

    setSubmitting(true);
    setNotice({ text: "Logging in...", color: "#64748b" });

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid username or password.");
      }

      const data = await res.json();
      saveToken(data.token);

      setNotice({ text: "✓ Logged in successfully.", color: "#06b6d4" });
      navigate("/tasks");
    } catch (err) {
      setNotice({ text: "✗ Invalid username or password.", color: "#ef4444" });
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

      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1.5rem" }}>Login</h1>

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
          {submitting ? "Logging in..." : "Login"}
        </button>

        <p style={{ fontFamily: "var(--mono)", fontSize: "0.65rem", color: notice.color, marginTop: "0.5rem" }}>
          {notice.text}
        </p>

        <p style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", color: "var(--muted)" }}>
          No account? <Link to="/register" style={{ color: "var(--wire)" }}>Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;