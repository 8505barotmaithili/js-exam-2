

const taskForm = document.getElementById('main');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskDueDate = document.getElementById('taskDueDate');
const taskPriority = document.getElementById('taskPriority');
const taskList = document.getElementById('taskList');
const priorityFilter = document.getElementById('priorityFilter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function displayTasks(filteredTasks = tasks) {
    taskList.innerHTML = ''; 
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${task.title}</strong> 
            <span>${task.description}</span>
            <span>${task.dueDate}</span>
            <span>${task.priority}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function addTask(event) {
    event.preventDefault(); 
    
    const title = taskTitle.value;
    const description = taskDescription.value;
    const dueDate = taskDueDate.value;
    const priority = taskPriority.value;

    const newTask = { title, description, dueDate, priority };
    tasks.push(newTask);
    saveTasksToLocalStorage();
    clearForm();
    displayTasks();
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearForm() {
    taskTitle.value = '';
    taskDescription.value = '';
    taskDueDate.value = '';
    taskPriority.value = 'low';
}

function editTask(index) {
    const task = tasks[index];
    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskDueDate.value = task.dueDate;
    taskPriority.value = task.priority;

    tasks.splice(index, 1); 
    saveTasksToLocalStorage();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    displayTasks();
}


taskForm.addEventListener('submit', addTask);
priorityFilter.addEventListener('change', filterTasks);

displayTasks();
