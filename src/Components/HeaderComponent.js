
import React,{useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JS for dropdown functionality

const HeaderComponent = () => {
  //const[user,setUser]=useState(null)
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  // useEffect(() => {
  //     const storedUser = localStorage.getItem("user");
  //     if (storedUser) {
  //       const parsedUser = JSON.parse(storedUser);
  //       setUser(parsedUser);      
  //     } else {
  //       navigate("/login");
  //     }
  //   }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/" style={{ color: "#4e54c8" }}>
          Alzheimer's Detection
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/" style={{ color: "#6a0dad" }}>
                Home
              </Link>
            </li>

            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle fw-bold"
                  id="navbarDropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: "none", border: "none", color: "#6a0dad" }}
                >
                  Menu
                </button>
                <ul className="dropdown-menu">
                <li>
                    <Link className="dropdown-item" to="/home">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/upload">
                      Predict
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/metrics">
                      Analysis
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle fw-bold"
                  id="navbarDropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: "none", border: "none", color: "#6a0dad" }}
                >
                  Menu
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/signup">
                      Signup
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
