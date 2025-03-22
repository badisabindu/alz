import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import HeaderComponent from "./HeaderComponent";

function LandingPage() {
  const isAuthenticated = !!localStorage.getItem("token");
  return (
    <div
      style={{
        background: "linear-gradient(to right, #4e54c8, #8f94fb)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <HeaderComponent/>

      {/* Hero Section */}
      <div className="container-fluid text-white text-center my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="fw-bold display-4">
              Early Detection of <br /> Alzheimer's Disease
            </h1>
            <p className="lead mt-3">
            Leverage advanced machine learning technology to detect Alzheimer's in its early stages, enabling individuals and healthcare providers to make data-driven decisions for improved outcomes.
            </p>
            <a
              href="#features"
              className="btn btn-primary btn-lg px-4 mt-3"
              style={{
                backgroundColor: "#4e54c8",
                borderColor: "#4e54c8",
                borderRadius: "10px",
              }}
            >
              Learn More
            </a>
          </div>
          <div className="col-md-6">
            <img
              src="https://courtlandconsulting.com/wp-content/uploads/2023/06/trauma-just-image.jpg"
              alt="AI for Alzheimer's"
              className="img-fluid rounded"
              style={{
                boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container-fluid my-5">
        <h2 className="text-center fw-bold mb-4" style={{ color: "#4e54c8" }}>
          Key Features
        </h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 p-4 h-100">
              <i
                className="bi bi-graph-up-arrow mb-3"
                style={{ fontSize: "3rem", color: "#4e54c8" }}
              ></i>
              <h5 className="fw-bold">ML-Powered Detection</h5>
              <p className="text-muted">
                Analyze cognitive patterns to identify early signs of
                Alzheimer's using ML models.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 p-4 h-100">
              <i
                className="bi bi-shield-check mb-3"
                style={{ fontSize: "3rem", color: "#4e54c8" }}
              ></i>
              <h5 className="fw-bold">Secure Data</h5>
              <p className="text-muted">
                We ensure complete privacy and security of all user data with
                industry-leading standards.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg border-0 p-4 h-100">
              <i
                className="bi bi-heart mb-3"
                style={{ fontSize: "3rem", color: "#4e54c8" }}
              ></i>
              <h5 className="fw-bold">User-Friendly Interface</h5>
              <p className="text-muted">
                Easy-to-use platform for individuals, caregivers, and healthcare
                professionals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="container text-center my-5">
        <h2 className="fw-bold text-white">
          Take the First Step Towards Better Care
        </h2>
        <p className="text-white lead">
          Sign up today to access our platform and make a difference.
        </p>
        <a
          href={isAuthenticated ? "/home" : "/signup"}
          className="btn btn-light btn-lg px-4 mt-3 fw-bold"
          style={{
            borderRadius: "10px",
            color: "#4e54c8",
            borderColor: "#4e54c8",
          }}
        >
          Get Started
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-white py-4">
        <div className="container text-center">
          <p className="mb-0 text-muted">
            &copy; 2025 Alzheimer's Detection. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;