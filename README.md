# Task Tracker CLI

Task Tracker CLI is a simple Command Line Interface application used to track and manage tasks. This tool allows users to add, update, delete, and view the status of tasks directly from the terminal. This Task Tracker CLI project is based on a project from [roadmap.sh](https://roadmap.sh), you can find more details about this project here: [Task Tracker Project](https://roadmap.sh/projects/task-tracker)

## Features

- **Add tasks**: Add new tasks to your to-do list.
- **Update tasks**: Modify the description of existing tasks.
- **Delete tasks**: Remove tasks by their ID.
- **Mark tasks**: Set the status of tasks as "in-progress" or "done".
- **List tasks**: View all tasks or filter by status.

## Installation

Clone this repository or download the code:

```bash
git clone https://github.com/ranggaradiitya/task-tracker-cli.git
cd task-tracker-cli
```

Initialize the project with npm:

```bash
npm init -y
```

Add CLI command: Edit `package.json` to include the bin section:

```json
{
  "name": "task-tracker-cli",
  "version": "1.0.0",
  "bin": {
    "task-cli": "./index.js"
  }
}
```

Link the project to create a global CLI command: Run the following command to link the project as a global CLI tool:

```bash
npm link
```

After this, you can use the `task-cli` command from anywhere in your terminal.

## Usage

Here are some commands you can use with the Task Tracker CLI:

### Add a Task

Add a new task with a description:

```bash
task-cli add "Task description"
```

**Example:**

```bash
task-cli add "Buy groceries"
```

Output: `Task added successfully (ID: 1)`

### Update a Task

Update an existing task description by its ID:

```bash
task-cli update [id] "New task description"
```

**Example:**

```bash
task-cli update 1 "Buy groceries and cook dinner"
```

### Delete a Task

Delete a task by its ID:

```bash
task-cli delete [id]
```

**Example:**

```bash
task-cli delete 1
```

Output: `Task deleted successfully`

### Mark a Task

Mark a task as "in-progress" or "done":

```bash
task-cli mark-in-progress [id]
task-cli mark-done [id]
```

**Example:**

```bash
task-cli mark-in-progress 1
task-cli mark-done 1
```

### List Tasks

List all tasks:

```bash
task-cli list
```

List tasks by status:

```bash
task-cli list [status]
```

Where `[status]` can be `todo`, `in-progress`, or `done`.

**Example:**

```bash
task-cli list done
```

### Help

To show usage information:

```bash
task-cli --help
```

## Task Data Structure

Each task is stored in the `tasks.json` file with the following structure:

```json
{
  "id": 1,
  "description": "Task description",
  "status": "todo",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

Properties of each task:

- `id`: Unique identifier for each task.
- `description`: A brief description of the task.
- `status`: The status of the task (todo, in-progress, done).
- `createdAt`: The date and time when the task was created.
- `updatedAt`: The date and time when the task was last updated.

## Error Handling

If there is an issue parsing the JSON file or if the file is empty, the application will automatically initialize the task list as an empty array. Clear error messages will be provided for invalid commands or if the task ID is not found.

## License

This project is licensed under the MIT License. You are free to use and modify this project under the terms of the license.
