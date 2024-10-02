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

// Function to load tasks from the JSON file
function loadTasks() {
  try {
    const tasksData = fs.readFileSync(tasksFilePath, 'utf8');
    return tasksData ? JSON.parse(tasksData) : [];
  } catch (error) {
    // If there is an error parsing the file, return an empty array
    return [];
  }
}

// Function to save tasks back to the JSON file
function saveTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// Function to add a new task
function addTask(description) {
  const tasks = loadTasks();
  const newTask = {
    id: tasks.length + 1, // Generate a new ID based on the task count
    description,
    status: 'todo', // Default status is 'todo'
    createdAt: new Date().toISOString(), // Record the current timestamp
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks); // Save the new task to the file
  console.log(`Task added successfully (ID: ${newTask.id})`);
}

// Function to update an existing task
function updateTask(id, newDescription) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === parseInt(id)); // Find the task by ID
  if (!task) {
    return console.log('Task not found'); // Handle case where task is not found
  }
  task.description = newDescription; // Update the description
  task.updatedAt = new Date().toISOString(); // Update the timestamp
  saveTasks(tasks); // Save the updated task to the file
  console.log('Task updated successfully');
}

// Function to delete a task by ID
function deleteTask(id) {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));

  if (taskIndex === -1) {
    // Task with given ID not found
    console.log('Task not found');
    return;
  }

  tasks.splice(taskIndex, 1); // Remove the task from the array
  saveTasks(tasks); // Save the updated task list to the file
  console.log('Task deleted successfully');
}

// Function to mark a task as 'in-progress' or 'done'
function markTask(id, status) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === parseInt(id)); // Find the task by ID
  if (!task) {
    return console.log('Task not found'); // Handle case where task is not found
  }
  task.status = status; // Update the status ('in-progress' or 'done')
  task.updatedAt = new Date().toISOString(); // Update the timestamp
  saveTasks(tasks); // Save the updated task to the file
  console.log(`Task marked as ${status}`);
}

// Function to list all tasks or tasks by a specific status
function listTasks(status) {
  const validStatuses = ['todo', 'in-progress', 'done']; // Define valid statuses
  const tasks = loadTasks();

  // If a status is provided, check if it's valid
  if (status && !validStatuses.includes(status)) {
    console.log('Invalid status. Please use "todo", "in-progress", or "done".');
    return;
  }

  let filteredTasks = tasks;

  // Filter tasks by the provided status if it's valid
  if (status) {
    filteredTasks = tasks.filter((task) => task.status === status);
  }

  // Check if there are tasks to display
  if (filteredTasks.length === 0) {
    console.log('No tasks found');
  } else {
    // Display each task
    filteredTasks.forEach((task) => {
      console.log(`${task.id}. ${task.description} [${task.status}]`);
    });
  }
}

// Function to show help information
function showHelp() {
  console.log(`
    Task Tracker CLI

    Usage:
      task-cli [command] [options]

    Commands:
      add [task]                Add a new task
      update [id] [new task]     Update an existing task
      delete [id]               Delete a task by ID
      mark-in-progress [id]      Mark a task as in progress
      mark-done [id]             Mark a task as done
      list                      List all tasks
      list [status]             List tasks by status (todo, in-progress, done)

    Options:
      --help                    Show help information
  `);
}

// Switch to determine which command was entered and execute the corresponding function
switch (command) {
  case 'add':
    addTask(args.join(' ')); // Add a new task
    break;
  case 'update':
    updateTask(args[0], args.slice(1).join(' ')); // Update an existing task
    break;
  case 'delete':
    deleteTask(args[0]); // Delete a task by ID
    break;
  case 'mark-in-progress':
    markTask(args[0], 'in-progress'); // Mark a task as 'in-progress'
    break;
  case 'mark-done':
    markTask(args[0], 'done'); // Mark a task as 'done'
    break;
  case 'list':
    listTasks(args[0]); // List all tasks or tasks by status
    break;
  case '--help':
    showHelp(); // Show help information
    break;
  default:
    console.log('Unknown command. Use --help for usage information.'); // Handle unknown commands
}
