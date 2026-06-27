import { loginUser } from "../api/auth.js";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await loginUser(loginData.username, loginData.email, loginData.password);
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">⚛</div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to continue learning</p>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-fields">
          <div className="field-group">
            <label className="field-label">Username</label>
            <input
              className="auth-input"
              name="username"
              placeholder="your_username"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="username"
            />
          </div>
          <div className="field-group">
            <label className="field-label">Email</label>
            <input
              className="auth-input"
              name="email"
              type="email"
              placeholder="you@email.com"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="email"
            />
          </div>
          <div className="field-group">
            <label className="field-label">Password</label>
            <input
              className="auth-input"
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
            />
          </div>
        </div>

        <button className="auth-btn" onClick={handleSubmit} disabled={loading}>
          {loading && <span className="spinner" />}
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="auth-footer">
          No account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;