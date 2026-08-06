import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskForm from "../components/Tasks/TaskForm";
import TaskList from "../components/Tasks/TaskList";
import TaskFilterBar from "../components/Tasks/TaskFilterBar";
import { getTasks } from "../utils/taskStorage";
import styles from "../components/Tasks/Tasks.module.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const refreshTasks = () => {
    setTasks(getTasks());
  };

  useEffect(() => {
    refreshTasks();
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

      <TaskList tasks={filteredTasks} onTaskChanged={refreshTasks} />
    </div>
  );
}

export default Tasks;