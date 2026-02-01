const { loadTasks, saveTasks } = require("./taskRepository");

const ALLOWED_PRIORITIES = ["low", "medium", "high"];

function normalizePriority(priority) {
	const p = String(priority || "medium").toLowerCase();
	if (!ALLOWED_PRIORITIES.includes(p)) {
		throw new Error('Invalid priority. Use: "low", "medium", "high".');
	}
	return p;
}

function getNextId(tasks) {
  let max = 0;
  for (const t of tasks) {
    if (typeof t.id === "number" && t.id > max) max = t.id;
  }
  return max + 1;
}

async function addTask(title, priority) {
  const tasks = await loadTasks();

  const newTask = {
    id: getNextId(tasks),
    title: String(title).trim(),
    completed: false,
    priority: normalizePriority(priority),
    createdAt: new Date().toISOString(),
  };

  const updated = [...tasks, newTask];
  await saveTasks(updated);

  return newTask;
}


/**
 * filter = { status: "all"|"completed"|"pending", priority: "low"|"medium"|"high"|null }
 */
async function listTasks(filter = { status: "all", priority: null }) {
  const tasks = await loadTasks();

  let result = tasks;

  if (filter.status === "completed") {
    result = result.filter((t) => t.completed === true);
  } else if (filter.status === "pending") {
    result = result.filter((t) => t.completed === false);
  }

  if (filter.priority) {
    const p = normalizePriority(filter.priority);
    result = result.filter((t) => t.priority === p);
  }

  return result.sort((a, b) => a.id - b.id);
}


async function markDone(id) {
  const tasks = await loadTasks();

  const task = tasks.find((t) => t.id === id);
  if (!task) {
    // penting: bagi index.js tahu "tak jumpa"
    return null;
  }

  task.completed = true;
  await saveTasks(tasks);

  return task; // ✅ ini yang index.js nak
}


async function deleteTask(id) {
  const tasks = await loadTasks();

  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;

  const [deleted] = tasks.splice(index, 1);
  await saveTasks(tasks);

  return deleted;
}


module.exports = { addTask, listTasks, markDone, deleteTask };
