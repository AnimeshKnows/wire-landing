import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TaskForm from "../components/Tasks/TaskForm";
import TaskList from "../components/Tasks/TaskList";
import TaskFilterBar from "../components/Tasks/TaskFilterBar";
import { getToken, isLoggedIn } from "../utils/auth";
import styles from "../components/Tasks/Tasks.module.css";
import { API_BASE_URL } from "../config";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const refreshTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (res.status === 401 || res.status === 403) {
        navigate("/login");
        return;
      }
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError("Couldn't load tasks. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    refreshTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTasks = tasks
    .filter((task) => {
      if (activeFilter === "Completed") return task.completed;
      if (activeFilter === "Pending") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className={styles.taskManager}>
      <Link to="/" className={styles.backLink}>← Back to Home</Link>
      <h1>Task Manager</h1>
      <p className={styles.subLabel}>
        {tasks.filter((t) => !t.completed).length} pending · {tasks.filter((t) => t.completed).length} completed
      </p>

      <TaskForm onTaskAdded={refreshTasks} />

      <TaskFilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {loading ? (
        <p className={styles.emptyState}>Loading tasks...</p>
      ) : error ? (
        <p className={styles.emptyState}>{error}</p>
      ) : (
        <TaskList tasks={filteredTasks} onTaskChanged={refreshTasks} />
      )}
    </div>
  );
}

export default Tasks;