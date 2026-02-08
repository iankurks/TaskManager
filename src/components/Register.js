import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import taskImage from "../images/header.png";
import Footer from "./Footer";

const API = "http://localhost:5000/auth";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await axios.post(`${API}/register`, {
        email,
        password,
      });

      setSuccess(res.data.message || "Registration successful");

      setEmail("");
      setPassword("");
      setConfirmPassword("");

      if (onRegister) onRegister();

      // Redirect to login page
      setTimeout(() => navigate("/"), 800);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="app-container login-card">
        <div className="app-header">
          <img src={taskImage} alt="Task Manager" />
          <h1>Create Account</h1>
          <p className="login-subtitle">
            Register with your email and password
          </p>
        </div>

        <form className="task-form" onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="auth-switch">
            Go back to {" "}
          <Link to="/" className="auth-link">
            Login
          </Link>
        </p>
        </form>

        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
      </div>
      
    </div>
  );
}
