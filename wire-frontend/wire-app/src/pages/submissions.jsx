import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Submissions() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wire_submissions") || "[]");
    setEntries(data.slice().reverse());
  }, []);

  const handleClear = () => {
    localStorage.removeItem("wire_submissions");
    setEntries([]);
  };

  return (
    <div className="submissions-page">
      <Link to="/" className="back-link">← Back to WIRE</Link>
      <h1>Submissions</h1>
      <p className="sub-label">All entries stored in LocalStorage · wire_submissions</p>

      <div id="list">
        {entries.length === 0 ? (
          <p className="empty">No submissions yet. Go fill the form!</p>
        ) : (
          <>
            {entries.map((entry, index) => (
              <div className="card" key={index}>
                <div className="card-name">{entry.name}</div>
                <div className="card-email">{entry.email}</div>
                <div className="card-message">{entry.message}</div>
                <div className="card-time">{new Date(entry.timestamp).toLocaleString()}</div>
              </div>
            ))}
            <button className="clear-btn" onClick={handleClear}>
              Clear All Submissions
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Submissions;