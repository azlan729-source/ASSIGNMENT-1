# Task Tracker CLI

## Project Overview
This is a simple command line task tracker built using JavaScript and Node.js.

I built this project to practice basic Node.js concepts like functions, async/await,
file handling, and using the terminal.
All tasks are stored in a JSON file so the data is saved.

This project is for learning purposes only.

---

## How To Run

1. Make sure Node.js is installed
2. Open terminal in the project folder
3. Run commands using:

node index.js <command>

---

## Commands

Add task:
node index.js add "Buy groceries" --priority high

List tasks:
node index.js list

List completed tasks:
node index.js list --completed

List pending tasks:
node index.js list --pending

Filter by priority:
node index.js list --priority high

Mark task as done:
node index.js done 2

Delete task:
node index.js delete 2

---

## Sample Output

Added #1: "Buy groceries" [high]

Tasks:
#1 | pending | high | Buy groceries

---

## Synchronous vs Asynchronous (Simple)

Synchronous code runs one by one and waits until the task finishes.

Asynchronous code allows the program to continue running while waiting for tasks
like reading or writing files.

This project uses asynchronous file handling.

---

## JavaScript Event Loop (Simple)

The event loop helps Node.js handle async tasks.
When a task finishes, it is placed in a queue and executed when the program is free.

---

## Notes

- Tasks are saved in data/tasks.json
- JSON file is created automatically if it does not exist
- Code is separated into files for easier understanding
- This is a learning project
