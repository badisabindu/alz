import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "./HeaderComponent";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = localStorage.getItem("user");
    console.log(localStorage.getItem("user"));
    console.log(storedUser)
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
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
            <h3 className="fw-bold" style={{ color: "#4e54c8" }}>Profile</h3>
            <p className="text-muted">Your account details</p>
          </div>
          {user ? (
            <div>
              <div className="mb-3">
                <strong>Name:</strong> <span>{user.full_name}</span>
              </div>
              <div className="mb-3">
                <strong>Email:</strong> <span>{user.email}</span>
              </div>
              <div className="mb-3">
                <strong>Role:</strong> <span>{user.role || "User"}</span>
              </div>
              <button className="btn btn-danger w-100 fw-bold py-2" style={{ borderRadius: "10px" }} onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <p className="text-center text-muted">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
