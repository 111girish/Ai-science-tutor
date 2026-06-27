import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-content">
        <div className="home-icon">⚛</div>
        <h1 className="home-title">SciTutor</h1>
        <p className="home-tagline">
          AI-powered tutoring for Mathematics, Physics, Chemistry, and more.
        </p>
        <div className="home-subjects">
          {["Mathematics", "Physics", "Chemistry", "Digital Logic", "OOP", "ECM"].map((s) => (
            <span key={s} className="subject-pill">{s}</span>
          ))}
        </div>
        <div className="home-actions">
          <button className="home-btn primary" onClick={() => navigate("/register")}>
            Get started
          </button>
          <button className="home-btn secondary" onClick={() => navigate("/login")}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;