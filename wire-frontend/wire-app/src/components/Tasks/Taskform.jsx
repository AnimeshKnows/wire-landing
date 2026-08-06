import { useState } from "react";
import { addTask } from "../../utils/taskStorage";
import styles from "./Tasks.module.css";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [notice, setNotice] = useState({ text: "", color: "" });

  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setNotice({ text: "✗ Task title is required.", color: "#ef4444" });
      return;
    }
    if (!dueDate) {
      setNotice({ text: "✗ Due date is required.", color: "#ef4444" });
      return;
    }
    if (dueDate < todayStr) {
      setNotice({ text: "✗ Due date cannot be in the past.", color: "#ef4444" });
      return;
    }

    addTask({ title: trimmedTitle, description: description.trim(), priority, dueDate });

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
    setNotice({ text: "✓ Task added.", color: "#06b6d4" });

    onTaskAdded();
  };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmit}>
      <div className={styles.formRow}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          min={todayStr}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className={styles.submitBtn}>+ Add Task</button>
      <p className={styles.formNotice} style={{ color: notice.color }}>
        {notice.text}
      </p>
    </form>
  );
}

export default TaskForm;