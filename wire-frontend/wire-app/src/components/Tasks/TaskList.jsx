import { getToken } from "../../utils/auth";
import styles from "./Tasks.module.css";

function TaskList({ tasks, onTaskChanged }) {
  const handleToggle = async (task) => {
    try {
      const res = await fetch(`http://localhost:8080/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      onTaskChanged();
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      onTaskChanged();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  if (tasks.length === 0) {
    return <p className={styles.emptyState}>No tasks yet. Add one above.</p>;
  }

  return (
    <div className={styles.taskList}>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`${styles.taskCard} ${task.completed ? styles.completed : ""}`}
        >
          <div className={styles.taskMain}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task)}
            />
            <div className={styles.taskInfo}>
              <h4>{task.title}</h4>
              {task.description && <p>{task.description}</p>}
              <div className={styles.taskMeta}>
                <span className={`${styles.priorityTag} ${styles[task.priority.toLowerCase()]}`}>
                  {task.priority}
                </span>
                {task.dueDate && (
                  <span className={styles.dueDate}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            className={styles.deleteBtn}
            onClick={() => handleDelete(task.id)}
            aria-label="Delete task"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;