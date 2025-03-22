
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "./HeaderComponent";

function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber,setMobileNumber]=useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.endsWith("@gmail.com")) {
      setError('Email must be a @gmail.com address');
      return;
  }

  if (mobileNumber.length !== 10) {
    setError("Mobile number should contain exactly 10 digits.");
    return;
  } else {
    setError(""); 

  }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password,mobileNumber }),
      });
      console.log(mobileNumber)

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      alert("Signup successful! Please log in.");
      navigate("/login"); // Redirect to login page after signup
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
            <h3 className="fw-bold" style={{ color: "#4e54c8" }}>Create Your Account</h3>
            <p className="text-muted">Join us to start your journey</p>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label fw-bold">Full Name</label>
              <input type="text" className="form-control" placeholder="Enter your full name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Email Address</label>
              <input type="email" className="form-control" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Mobile Number</label>
              <input type="text" className="form-control" placeholder="Enter your mobile number" required value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <input type="password" className="form-control" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Confirm Password</label>
              <input type="password" className="form-control" placeholder="Confirm your password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold py-2" style={{ borderRadius: "10px", backgroundColor: "#4e54c8", borderColor: "#4e54c8" }}>Signup</button>
          </form>
          <div className="text-center mt-3">
            <p className="small mb-0">Already have an account? <a href="/login" className="text-decoration-none fw-bold text-primary">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;