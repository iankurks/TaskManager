import { useState } from "react";
import axios from "axios";
import "./Login.css";
import taskImage from "../images/header.png";
import {Link, useNavigate } from "react-router-dom";

// const API = "http://localhost:5000/auth";
const API = "https://taskmanagerbackend-production-7f1c.up.railway.app/auth"


export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setLoading(true);
      setError("");
      const res = await axios.post(`${API}/login`, { email, password });
      // Save login info in localStorage (simple auth)
      localStorage.setItem("userEmail", res.data.email);
      onLogin(res.data.email);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="login-wrapper">
      <div className="app-container login-card">
        <div className="app-header">
          <img src={taskImage} alt="Task Manager" />
          <h1>Welcome Back</h1>
          <p className="login-subtitle">Login with your email and password</p>
        </div>

        <form className="task-form" onSubmit={handleLogin}>
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
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}
        {/* 👇 NEW TEXT */}
        <p className="auth-switch">
          Not a member?{" "}
          <Link to="/register" className="auth-link">
            Register now
          </Link>
        </p>
      </div>
      
    </div>

    </>
  );
}
