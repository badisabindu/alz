


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBrain, FaFileUpload, FaExclamationTriangle } from "react-icons/fa";  // Icons for added visual appeal

const UploadPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle image selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Handle image upload and prediction request
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data)
      setResult(data.prediction);
      setConfidence(data.confidence ? `${(data.confidence * 100).toFixed(2)}%` : null);
      console.log(confidence)
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  // Precautions based on prediction result
  const getPrecautions = (prediction) => {
    const precautions = {
      "Non Demented": "Maintain a healthy lifestyle with regular exercise, a balanced diet, and cognitive activities like puzzles and reading.",
      "Very Mild Demented": "Engage in memory exercises, maintain social interactions, and monitor diet and sleep quality.",
      "Mild Demented": "Create structured routines, ensure regular doctor visits, and seek support from family or caregivers.",
      "Moderate Demented": "Provide assistance with daily tasks, ensure home safety, and consider professional caregiving support.",
    };
    return precautions[prediction] || "No specific precautions available.";
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://cdn.images.express.co.uk/img/dynamic/11/590x/secondary/Brain-inflammation-4327236.jpg?r=1665132648724')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderComponent />
      <div className="container mt-5">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="fw-bold" style={{ color: "#6a0dad" }}><FaFileUpload className="mb-1" /> Upload Image for Detection</h2>
          <p className="text-muted">
            Upload an MRI or brain scan image for Alzheimer's detection using our AI-powered system.
          </p>
          <div className="mb-3">
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleFileChange}
              style={{ borderRadius: "10px" }}
            />
          </div>
          {selectedImage && (
            <div className="text-center mt-4">
              <h5>Uploaded Image:</h5>
              <img
                src={selectedImage}
                alt="Uploaded preview"
                className="img-fluid rounded"
                style={{
                  maxHeight: "300px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              />
            </div>
          )}
          <div className="text-center mt-3">
            <button className="btn btn-primary" onClick={handleUpload} disabled={loading}>
              {loading ? (
                <span><i className="fa fa-spinner fa-spin"></i> Processing...</span>
              ) : (
                "Predict"
              )}
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-5 p-4 bg-light shadow rounded text-center">
            <h2 className="text-primary fw-bold"><FaBrain className="mb-1" /> Detection Result</h2>
            <p className="text-success fw-bold">{result}</p>
            {confidence && <p className="text-muted">Confidence: {confidence}</p>}
            <div
              className="mt-3 p-4 bg-white rounded"
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                color: "#6a0dad",
                textAlign: "left",
              }}
            >
              <h4 className="text-danger"><FaExclamationTriangle className="mb-1" /> Precautions</h4>
              <p className="text-muted">{getPrecautions(result)}</p>
            </div>
          </div>
        )}

        <div className="mt-4 text-center">
          <button className="btn btn-secondary" onClick={() => navigate("/home")}>Back to Home</button>
        </div>
      </div>
      <br></br>

      <footer className="bg-white py-3 mt-auto text-center">
        <p className="mb-0 text-muted">&copy; 2025 Alzheimer's Detection. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default UploadPage;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import HeaderComponent from "./HeaderComponent";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { FaBrain, FaFileUpload, FaExclamationTriangle } from "react-icons/fa";

// const UploadPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [confidence, setConfidence] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Handle file selection
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setSelectedImage(URL.createObjectURL(file));
//     }
//   };

//   // Upload image and request prediction
//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setError("Please select an image first.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     setLoading(true);
//     try {
//       const response = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       console.log(data.prediction)
//       setResult(data.prediction);
//       setConfidence(data.confidence ? `${(data.confidence * 100).toFixed(2)}%` : null);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//     setLoading(false);
//   };

//   // Define precautions based on the result
//   const getPrecautions = (prediction) => {
//     const precautions = {
//       "Non Demented": "Maintain a healthy lifestyle with exercise, a balanced diet, and cognitive activities like reading.",
//       "Very Mild Demented": "Engage in memory exercises, maintain social interactions, and monitor diet and sleep quality.",
//       "Mild Demented": "Create structured routines, ensure regular doctor visits, and seek support from family or caregivers.",
//       "Moderate Demented": "Provide assistance with daily tasks, ensure home safety, and consider professional caregiving support.",
//     };
//     return precautions[prediction] || "No specific precautions available.";
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: "url('https://cdn.images.express.co.uk/img/dynamic/11/590x/secondary/Brain-inflammation-4327236.jpg?r=1665132648724')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <HeaderComponent />
//       <div className="container mt-5">
//         <div className="p-4 bg-white shadow rounded">
//           <h2 className="fw-bold" style={{ color: "#6a0dad" }}>
//             <FaFileUpload className="mb-1" /> Upload MRI for Analysis
//           </h2>
//           <p className="text-muted">Upload an MRI scan for Alzheimer's detection.</p>

//           {/* File Input */}
//           <div className="mb-3">
//             <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
//           </div>

//           {/* Image Preview */}
//           {selectedImage && (
//             <div className="text-center mt-3">
//               <h5>Uploaded Image:</h5>
//               <img
//                 src={selectedImage}
//                 alt="Uploaded preview"
//                 className="img-fluid rounded"
//                 style={{ maxHeight: "250px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
//               />
//             </div>
//           )}

//           {/* Upload Button */}
//           <div className="text-center mt-3">
//             <button className="btn btn-primary" onClick={handleUpload} disabled={loading}>
//               {loading ? <span><i className="fa fa-spinner fa-spin"></i> Processing...</span> : "Predict"}
//             </button>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="alert alert-danger mt-4 text-center">
//             <FaExclamationTriangle /> {error}
//           </div>
//         )}

//         {/* Prediction Result */}
//         {result && (
//           <div className="mt-5 p-4 bg-light shadow rounded text-center">
//             <h2 className="text-primary fw-bold"><FaBrain className="mb-1" /> Detection Result</h2>
//             <p className="text-success fw-bold">{result}</p>
//             {confidence && <p className="text-muted">Confidence: {confidence}</p>}

//             {/* Precautions Section */}
//             <div className="mt-3 p-4 bg-white rounded" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", textAlign: "left" }}>
//               <h4 className="text-danger"><FaExclamationTriangle className="mb-1" /> Precautions</h4>
//               <p className="text-muted">{getPrecautions(result)}</p>
//             </div>
//           </div>
//         )}

//         {/* Navigation */}
//         <div className="mt-4 text-center">
//           <button className="btn btn-secondary" onClick={() => navigate("/home")}>Back to Home</button>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-white py-3 mt-auto text-center">
//         <p className="mb-0 text-muted">&copy; 2025 Alzheimer's Detection. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default UploadPage;
