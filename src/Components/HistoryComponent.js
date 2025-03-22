import React, { useState, useEffect } from "react";
import HeaderComponent from "./HeaderComponent";

const HistoryPage = () => {
  const [history, setHistory] = useState([]);

  // Fetch history from backend
  const fetchHistory = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/history", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }

      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  // Clear history
  const clearHistory = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/clear_history", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to clear history");
      }

      setHistory([]); // Clear state after deletion
    } catch (error) {
      console.error("Error clearing history:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <HeaderComponent />
      <div className="container mt-5">
        <h2 className="fw-bold" style={{ color: "#6a0dad" }}>Scan History</h2>

        {/* Buttons to refresh and clear history */}
        <button className="btn btn-primary mt-3 me-2" onClick={fetchHistory}>Refresh</button>
        <button className="btn btn-danger mt-3" onClick={clearHistory}>Clear History</button>

        <ul className="list-group mt-3">
          {history.length ? (
            history.map((item, index) => (
              <li key={index} className="list-group-item">
                <strong>Date:</strong> {item.date} <br />
                <strong>Result:</strong> {item.result} <br />
                <strong>Confidence:</strong> {item.confidence}%
              </li>
            ))
          ) : (
            <p className="text-muted">No previous scans found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HistoryPage;
