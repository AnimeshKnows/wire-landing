import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Submissions.module.css";
import { API_BASE_URL } from "../config";

function Submissions() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/contacts`);
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        const data = await res.json();
        setEntries(data.slice().reverse());
      } catch (err) {
        setError("Couldn't load submissions. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className={styles.submissionsPage}>
      <Link to="/" className={styles.backLink}>← Back to WIRE</Link>
      <h1 className={styles.title}>Submissions</h1>
      <p className={styles.subLabel}>All entries fetched from the Spring Boot API · GET /contacts</p>

      <div className={styles.list}>
        {loading ? (
          <p className={styles.empty}>Loading submissions...</p>
        ) : error ? (
          <p className={styles.empty}>{error}</p>
        ) : entries.length === 0 ? (
          <p className={styles.empty}>No submissions yet. Go fill the form!</p>
        ) : (
          entries.map((entry) => (
            <div className={styles.card} key={entry.id}>
              <div className={styles.cardName}>{entry.name}</div>
              <div className={styles.cardEmail}>{entry.email}</div>
              <div className={styles.cardMessage}>{entry.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Submissions;