import { deleteTask, toggleComplete } from "../../utils/taskStorage";
import styles from "./Tasks.module.css";

function TaskList({ tasks, onTaskChanged }) {
  const handleToggle = (id) => {
    toggleComplete(id);
    onTaskChanged();
  };

  const handleDelete = (id) => {
    deleteTask(id);
    onTaskChanged();
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
              onChange={() => handleToggle(task.id)}
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