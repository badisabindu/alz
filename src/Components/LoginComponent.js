

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "./HeaderComponent";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      alert("Login successful!");
      navigate("/home"); // Redirect after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="d-flex flex-column"
      style={{
        background: "linear-gradient(to right, #4e54c8, #8f94fb)",
        minHeight: "100vh",
      }}
    >
      <HeaderComponent />
      <div className="container d-flex flex-grow-1 align-items-center justify-content-center">
        <div className="card shadow-lg p-5" style={{ maxWidth: "500px", width: "100%", borderRadius: "15px", background: "#ffffff" }}>
          <div className="text-center mb-4">
            <h3 className="fw-bold" style={{ color: "#4e54c8" }}>Welcome Back</h3>
            <p className="text-muted">Sign in to access your account</p>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-bold">Email Address</label>
              <input type="email" className="form-control" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <input type="password" className="form-control" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold py-2" style={{ borderRadius: "10px", backgroundColor: "#4e54c8", borderColor: "#4e54c8" }}>Login</button>
          </form>
          <div className="text-center mt-3">
            <a href="/signup" className="text-decoration-none fw-bold text-primary">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
