// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import HeaderComponent from "./HeaderComponent";

// const ProfilePage = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Fetch user data from localStorage
//     const storedUser = localStorage.getItem("user");
//     console.log(localStorage.getItem("user"));
//     console.log(storedUser)
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     } else {
//       navigate("/login"); // Redirect to login if not authenticated
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <div
//       className="d-flex flex-column"
//       style={{
//         background: "linear-gradient(to right, #4e54c8, #8f94fb)",
//         minHeight: "100vh",
//       }}
//     >
//       <HeaderComponent />
//       <div className="container d-flex flex-grow-1 align-items-center justify-content-center">
//         <div className="card shadow-lg p-5" style={{ maxWidth: "500px", width: "100%", borderRadius: "15px", background: "#ffffff" }}>
//           <div className="text-center mb-4">
//             <h3 className="fw-bold" style={{ color: "#4e54c8" }}>Profile</h3>
//             <p className="text-muted">Your account details</p>
//           </div>
//           {user ? (
//             <div>
//               <div className="mb-3">
//                 <strong>Name:</strong> <span>{user.full_name}</span>
//               </div>
//               <div className="mb-3">
//                 <strong>Email:</strong> <span>{user.email}</span>
//               </div>
//               <div className="mb-3">
//                 <strong>Role:</strong> <span>{user.role || "User"}</span>
//               </div>
//               <button className="btn btn-danger w-100 fw-bold py-2" style={{ borderRadius: "10px" }} onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <p className="text-center text-muted">Loading...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "./HeaderComponent";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("/default-profile.png");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUsername(parsedUser.full_name);
      setMobileNumber(parsedUser.mobile_number || "");
      setEmail(parsedUser.email);
      setProfileImage(parsedUser.profile_image || "/default-profile.png");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User ID missing. Please log in again.");
      return;
    }

    const updatedUser = {
      id: userId,
      full_name: username,
      email: email,
      mobile_number: mobileNumber,
      profile_image: profileImage, // Sending Base64 string
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/update-profile", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleProfileDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const id = Number(localStorage.getItem("userId"));
      if (!id) {
        alert("User ID is missing. Please log in again.");
        return;
      }

      const response = await fetch("http://127.0.0.1:5000/delete-account", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Send id as number
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete account");
      }

      alert("Account deleted successfully!");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      navigate("/signup");
    } catch (err) {
      console.error(err);
      alert(err.message);
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
        <div
          className="card shadow-lg p-5 text-center"
          style={{
            maxWidth: "500px",
            width: "100%",
            borderRadius: "15px",
            background: "#ffffff",
          }}
        >
          <div className="text-center mb-4">
            {/* <img
              src={profileImage}
              alt="Profile"
              className="rounded-circle shadow"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            /> */}
            <h3 className="fw-bold mt-3" style={{ color: "#4e54c8" }}>
              Profile
            </h3>
            <p className="text-muted">Your account details</p>
          </div>
          {user ? (
            <div>
              {!isEditing ? (
                <>
                  <div className="mb-3">
                    <strong>Name:</strong> {user.full_name}
                  </div>
                  <div className="mb-3">
                    <strong>Email:</strong> {user.email}
                  </div>
                  <div className="mb-3">
                    <strong>Mobile:</strong> {user.mobile_number || "N/A"}
                  </div>
                  <div className="d-flex justify-content-center gap-2 mt-4">
                    <button className="btn btn-primary fw-bold" onClick={handleEditToggle}>
                      Edit
                    </button>
                    <button className="btn btn-dark fw-bold" onClick={handleProfileDelete}>
                      Delete Account
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* <div className="mb-3">
                    <label className="form-label">Profile Picture</label>
                    <input type="file" className="form-control" onChange={handleImageChange} />
                  </div> */}
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      disabled
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mobile</label>
                    <input
                      type="text"
                      className="form-control"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-center gap-2 mt-3">
                    <button type="submit" className="btn btn-success fw-bold">
                      Save
                    </button>
                    <button type="button" className="btn btn-secondary fw-bold" onClick={handleEditToggle}>
                      Cancel
                    </button>
                  </div>
                </form>
              )}
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