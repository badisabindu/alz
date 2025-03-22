


import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage:
          "url('https://cdn.images.express.co.uk/img/dynamic/11/590x/secondary/Brain-inflammation-4327236.jpg?r=1665132648724')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <HeaderComponent />
      <div className="container-fluid mt-5">
        <div className="mb-5 p-4 bg-white shadow rounded">
          <h2 className="fw-bold" style={{ color: "#6a0dad" }}>About Alzheimer's</h2>
          <p className="text-muted">
            Alzheimer's disease is a progressive brain disorder that affects memory, thinking, and behavior. It is the most common cause of dementia, leading to a decline in cognitive function over time. Early diagnosis can help manage symptoms and improve the quality of life.
          </p>
          <p className="text-muted">
            Detection of Alzheimer's often involves cognitive assessments, MRI scans, and advanced AI models analyzing brain patterns. Machine learning models can help in early-stage detection by analyzing structural changes in the brain.
          </p>
          <p className="text-muted">
            Early detection is crucial for managing symptoms effectively. It helps in planning treatment and lifestyle modifications. Diagnostic methods include clinical evaluations, cognitive tests, brain imaging (MRI, PET scans), and biomarker analysis in cerebrospinal fluid. AI-powered models analyze MRI scans to identify structural abnormalities in the brain, aiding in early and accurate diagnosis.
          </p>
          <p className="text-muted">
            Risk factors for Alzheimer's include genetic predisposition, lifestyle factors, cardiovascular conditions, and age. A healthy diet, regular exercise, cognitive stimulation, and social engagement can reduce the risk and slow disease progression.
          </p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="fw-bold" style={{ color: "#6a0dad" }}>Stages of Alzheimer's</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card p-3 shadow-sm">
                <h4 className="fw-bold">Non-Demented</h4>
                <p className="text-muted">Individuals with no noticeable cognitive decline. They perform daily tasks efficiently without difficulty. Some minor forgetfulness due to aging may be present, but it is not linked to dementia.</p>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card p-3 shadow-sm">
                <h4 className="fw-bold">Very Mild Demented</h4>
                <p className="text-muted">Subtle memory lapses, such as forgetting names or misplacing objects, but daily activities remain unaffected. Brain structure changes may already begin but remain undetected without imaging tests.</p>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card p-3 shadow-sm">
                <h4 className="fw-bold">Mild Demented</h4>
                <p className="text-muted">Noticeable memory decline, difficulties with problem-solving, and challenges in managing finances or planning tasks. Individuals may have trouble recalling recent events or making decisions.</p>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card p-3 shadow-sm">
                <h4 className="fw-bold">Moderate Demented</h4>
                <p className="text-muted">Severe memory loss, disorientation, and an increased need for assistance in daily tasks and personal care. Individuals may struggle to recognize family members and familiar places, and mood changes such as anxiety or agitation may occur.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 text-center">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/upload")}
            style={{ borderRadius: "10px", padding: "10px 20px" }}
          >
            Upload Image for Detection
          </button>
          
        </div>
      </div>
<br></br>
      <footer className="bg-white py-3 mt-auto text-center">
        <p className="mb-0 text-muted">&copy; 2025 Alzheimer's Detection. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
