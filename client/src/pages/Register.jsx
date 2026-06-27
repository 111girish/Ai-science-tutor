import { registerUser } from "../api/auth.js";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({ fullname: "", username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      await registerUser(registerData.fullname, registerData.username, registerData.email, registerData.password);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
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
        <h1 className="auth-title">Create account</h1>
        <p className="auth-subtitle">Start your science journey</p>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-fields">
          <div className="field-group">
            <label className="field-label">Full name</label>
            <input className="auth-input" name="fullname" placeholder="Girish Pokhrel" onChange={handleChange} onKeyDown={handleKeyDown} />
          </div>
          <div className="field-group">
            <label className="field-label">Username</label>
            <input className="auth-input" name="username" placeholder="your_username" onChange={handleChange} onKeyDown={handleKeyDown} />
          </div>
          <div className="field-group">
            <label className="field-label">Email</label>
            <input className="auth-input" name="email" type="email" placeholder="you@email.com" onChange={handleChange} onKeyDown={handleKeyDown} />
          </div>
          <div className="field-group">
            <label className="field-label">Password</label>
            <input className="auth-input" name="password" type="password" placeholder="••••••••" onChange={handleChange} onKeyDown={handleKeyDown} />
          </div>
        </div>

        <button className="auth-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;