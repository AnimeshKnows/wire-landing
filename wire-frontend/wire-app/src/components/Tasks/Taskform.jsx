import { useState } from "react";
import { getToken } from "../../utils/auth";
import styles from "./Tasks.module.css";

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [notice, setNotice] = useState({ text: "", color: "" });
  const [submitting, setSubmitting] = useState(false);

  const todayStr = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
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

    setSubmitting(true);
    setNotice({ text: "Adding task...", color: "#64748b" });

    try {
      const res = await fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          title: trimmedTitle,
          description: description.trim(),
          priority,
          dueDate,
          completed: false,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setDueDate("");
      setNotice({ text: "✓ Task added.", color: "#06b6d4" });

      onTaskAdded();
    } catch (err) {
      setNotice({ text: "✗ Couldn't add task. Please try again.", color: "#ef4444" });
    } finally {
      setSubmitting(false);
    }
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
      <button type="submit" className={styles.submitBtn} disabled={submitting}>
        {submitting ? "Adding..." : "+ Add Task"}
      </button>
      <p className={styles.formNotice} style={{ color: notice.color }}>
        {notice.text}
      </p>
    </form>
  );
}

export default TaskForm;