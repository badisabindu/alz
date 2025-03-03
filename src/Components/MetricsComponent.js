import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Line } from "react-chartjs-2";

const MetricsPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [classReportUrl, setClassReportUrl] = useState("/classification-report");
  const [crossValidation, setCrossValidation] = useState(null);
  const [confMatrixUrl, setConfMatrixUrl] = useState("/confusion-matrix");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/metrics")
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data);
        setConfMatrixUrl("http://127.0.0.1:5000/confusion-matrix");
        setClassReportUrl("http://127.0.0.1:5000/classification-report");
        setCrossValidation("http://127.0.0.1:5000/cross-validation")
      })
      .catch((err) => console.error("Error fetching metrics:", err));


      fetch("http://127.0.0.1:5000/cross-validation")
      .then((res) => res.json())
      .then((data) => {
        setCrossValidation(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cross-validation results:", err);
        setLoading(false);
      });
  },[]);
  

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <HeaderComponent />

      <div className="container mt-5">
        {/* Model Performance Overview */}
        <div className="mb-5 p-4 bg-white shadow rounded text-center">
          <h2 className="fw-bold text-primary">Model Performance Metrics</h2>
          <p className="text-muted">
            Below are the performance metrics of our AI model used for
            Alzheimer's detection.
          </p>
        </div>

        {/* Confusion Matrix */}
        {metrics && (
          <div className="p-4 bg-white shadow rounded text-center">
            <h2 className="fw-bold text-primary">Confusion Matrix</h2>
            <img
              src={confMatrixUrl}
              alt="Confusion Matrix"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "400px" }}
            />
          </div>
        )}

        {/* Performance Metrics Chart */}
        {metrics && (
          <div className="mt-5 p-5 bg-white shadow-lg rounded text-center">
            <h2 className="fw-bold mb-5 text-primary">Performance Metrics</h2>
            <div className="mx-auto" style={{ maxWidth: "900px" }}>
              <Bar
                data={{
                  labels: ["Accuracy", "Precision", "Recall", "F1-Score"],
                  datasets: [
                    {
                      label: "Score",
                      data: [
                        metrics.accuracy.toFixed(2),
                        metrics.precision.toFixed(2),
                        metrics.recall.toFixed(2),
                        metrics.f1_score.toFixed(2),
                      ],
                      backgroundColor: [
                        "rgba(54, 162, 235, 0.6)", // Blue
                        "rgba(75, 192, 192, 0.6)", // Green
                        "rgba(255, 159, 64, 0.6)", // Orange
                        "rgba(255, 99, 132, 0.6)", // Red
                      ],
                      borderColor: [
                        "rgba(54, 162, 235, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(255, 159, 64, 1)",
                        "rgba(255, 99, 132, 1)",
                      ],
                      borderWidth: 2,
                      borderRadius: 10,
                      hoverBackgroundColor: [
                        "rgba(54, 162, 235, 0.8)",
                        "rgba(75, 192, 192, 0.8)",
                        "rgba(255, 159, 64, 0.8)",
                        "rgba(255, 99, 132, 0.8)",
                      ],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 1.0,
                      ticks: { stepSize: 0.2, font: { size: 14 } },
                      grid: { color: "rgba(0,0,0,0.1)" },
                    },
                    x: {
                      grid: { display: false },
                      ticks: { font: { size: 14, weight: "bold" }, color: "#6a0dad" },
                    },
                  },
                }}
                style={{ height: "300px" }}
              />
            </div>
          </div>
        )}

        {/* Classification Report Table */}
        
        <div className="mt-5 p-4 bg-white shadow rounded text-center">
        <h2 className="fw-bold text-primary">Classification Report</h2>
        <img
          src={classReportUrl}
          alt="Classification Report"
          className="img-fluid rounded shadow"
          style={{ maxHeight: "400px" }}
        />
      </div>

      {/* Cross-Validation Graph */}
      {loading ? (
          <p className="text-muted text-center">Loading cross-validation results...</p>
        ) : crossValidation?.accuracies?.length > 0 ? (
          <div className="mt-5 p-4 bg-white shadow rounded text-center">
            <h2 className="fw-bold text-primary">Cross-Validation Accuracy</h2>
            <div className="mx-auto" style={{ maxWidth: "700px" }}>
              <Line
                data={{
                  labels: crossValidation.folds, // X-axis labels
                  datasets: [
                    {
                      label: "Accuracy",
                      data: crossValidation.accuracies, // Y-axis data
                      borderColor: "rgba(54, 162, 235, 1)",
                      backgroundColor: "rgba(54, 162, 235, 0.2)",
                      borderWidth: 2,
                      tension: 0,
                      pointRadius: 5,
                      pointBackgroundColor: "rgba(54, 162, 235, 1)",
                      pointBorderColor: "#fff",
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: false, // Don't start at zero
                      min: 0.92, // Start from 0.9
                      max: 0.96, // Keep max at 1.0
                      ticks: { 
                        stepSize: 0.01, // Smaller steps for better granularity
                        font: { size: 14 } 
                      },
                    },
                    x: {
                      type: "linear", // Ensure it interprets numeric values correctly
                      min: 0, // Start from fold 1
                      max: crossValidation.length, // Set max dynamically based on data
                      ticks: { 
                      stepSize: 2, // Ensure folds are shown correctly
                      font: { size: 14 } 
                      },
                      title: { display: true, text: "Fold Number" },
                    },
                  },
                  plugins: {
                    legend: { display: false },
                  },
                }}
                style={{ height: "400px" }}
              />
            </div>
          </div>
        ) : (
          <p className="text-muted text-center">Cross-validation results not available.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white py-3 mt-auto text-center">
        <p className="mb-0 text-muted">
          &copy; 2025 Alzheimer's Detection. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default MetricsPage;