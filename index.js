#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define the path to the tasks.json file
const tasksFilePath = path.join(__dirname, 'tasks.json');

// Initialize the tasks file if it doesn't exist
if (!fs.existsSync(tasksFilePath)) {
  fs.writeFileSync(tasksFilePath, JSON.stringify([]));
}

// Extract command and arguments from the command-line input
const [, , command, ...args] = process.argv;

// Load tasks from the JSON file
function loadTasks() {
  try {
    const tasksData = fs.readFileSync(tasksFilePath, 'utf8');
    return tasksData ? JSON.parse(tasksData) : [];
  } catch (error) {
    return [];
  }
}

// Save tasks to the JSON file
function saveTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// Add a new task with default status 'todo'
function addTask(description) {
  const tasks = loadTasks();
  const newTask = {
    id: tasks.length + 1, // Auto-increment task ID based on current number of tasks
    description,
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks); // Save the new task to the file
  console.log(`Task added successfully (ID: ${newTask.id})`);
}

// Update the description of an existing task by ID
function updateTask(id, newDescription) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    return console.log('Task not found');
  }
  task.description = newDescription;
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log('Task updated successfully');
}

// Delete a task by ID
function deleteTask(id) {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));

  if (taskIndex === -1) {
    // Task with given ID not found
    console.log('Task not found');
    return;
  }

  tasks.splice(taskIndex, 1);
  saveTasks(tasks);
  console.log('Task deleted successfully');
}

// Mark a task as 'in-progress' or 'done'
function markTask(id, status) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    return console.log('Task not found');
  }
  task.status = status;
  task.updatedAt = new Date().toISOString();
  saveTasks(tasks);
  console.log(`Task marked as ${status}`);
}

// List all tasks or filter by status ('todo', 'in-progress', 'done')
function listTasks(status) {
  const validStatuses = ['todo', 'in-progress', 'done'];
  const tasks = loadTasks();

  if (status && !validStatuses.includes(status)) {
    console.log('Invalid status. Please use "todo", "in-progress", or "done".');
    return;
  }

  let filteredTasks = tasks;

  if (status) {
    filteredTasks = tasks.filter((task) => task.status === status);
  }

  if (filteredTasks.length === 0) {
    console.log('No tasks found');
  } else {
    filteredTasks.forEach((task) => {
      console.log(`${task.id}. ${task.description} [${task.status}]`);
    });
  }
}

// Show help information
function showHelp() {
  console.log(`
    Task Tracker CLI

    Usage:
      task-cli [command] [options]

    Commands:
      add [task]                Add a new task
      update [id] [new task]    Update an existing task
      delete [id]               Delete a task by ID
      mark-in-progress [id]     Mark a task as in progress
      mark-done [id]            Mark a task as done
      list                      List all tasks
      list [status]             List tasks by status (todo, in-progress, done)

    Options:
      --help                    Show help information
  `);
}

// Handle command input
switch (command) {
  case 'add':
    addTask(args.join(' '));
    break;
  case 'update':
    updateTask(args[0], args.slice(1).join(' '));
    break;
  case 'delete':
    deleteTask(args[0]);
    break;
  case 'mark-in-progress':
    markTask(args[0], 'in-progress');
    break;
  case 'mark-done':
    markTask(args[0], 'done');
    break;
  case 'list':
    listTasks(args[0]);
    break;
  case '--help':
    showHelp();
    break;
  default:
    console.log('Unknown command. Use --help for usage information.');
}
