import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import TaskManager from "./components/TaskManager";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

function App() {
  const [user, setUser] = useState(localStorage.getItem("userEmail"));

  const handleLogin = (email) => {
    localStorage.setItem("userEmail", email);
    setUser(email);
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUser(null);
  };

  return (
    <div className="app-root">
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={
            user ? <Navigate to="/home" /> : <Register />
          }
        />

        {/* Task Manager */}
        <Route
          path="/home"
          element={
            user ? (
              <TaskManager user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;