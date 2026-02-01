const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "tasks.json");

async function ensureFileExists() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, "[]", "utf-8");
  }
}

async function loadTasks() {
  await ensureFileExists();
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function saveTasks(tasks) {
  await ensureFileExists();
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), "utf-8");
}

module.exports = { loadTasks, saveTasks };
