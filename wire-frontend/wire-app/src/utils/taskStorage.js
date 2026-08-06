const STORAGE_KEY = "wire_tasks";

export function getTasks() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(task) {
  const tasks = getTasks();
  const newTask = {
    id: Date.now().toString(),
    title: task.title,
    description: task.description || "",
    completed: false,
    priority: task.priority || "Medium",
    dueDate: task.dueDate || null,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
}

export function updateTask(id, updates) {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  tasks[index] = { ...tasks[index], ...updates };
  saveTasks(tasks);
  return tasks[index];
}

export function deleteTask(id) {
  const tasks = getTasks().filter((t) => t.id !== id);
  saveTasks(tasks);
}

export function toggleComplete(id) {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  return tasks[index];
}