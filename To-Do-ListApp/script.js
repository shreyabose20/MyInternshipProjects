// Get elements from the DOM
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Check for existing tasks in local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to display tasks in the list
function displayTasks() {
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button class="edit-task">Edit</button>
            <button class="delete-task">Delete</button>
        `;
        taskList.appendChild(li);

        // Event listeners for edit and delete buttons
        const editButton = li.querySelector(".edit-task");
        editButton.addEventListener("click", () => editTask(i));

        const deleteButton = li.querySelector(".delete-task");
        deleteButton.addEventListener("click", () => deleteTask(i));

        // Toggle task completion status
        li.addEventListener("click", () => toggleTask(i));
    }
}

// Function to add a new task
function addTask() {
    const taskText = newTaskInput.value;
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        newTaskInput.value = "";
        saveTasks();
        displayTasks();
    }
}

// Function to edit an existing task
function editTask(index) {
    const updatedText = prompt("Edit the task:", tasks[index].text);
    if (updatedText !== null) {
        tasks[index].text = updatedText;
        saveTasks();
        displayTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

// Function to toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

// Function to save tasks in local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event listener for the "Add" button
addTaskButton.addEventListener("click", addTask);

// Display initial tasks
displayTasks();
