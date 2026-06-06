// DOM Elements
const todoInput = document.querySelector('.input-container input[type="text"]');
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list');
const activeCount = document.querySelector('.stats-row .card:first-child .num');
const completedCount = document.querySelector('.stats-row .card:nth-child(2) .num');
const totalCount = document.querySelector('.stats-row .card:last-child .num');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Initialize the app
function init() {
  renderTasks();
  updateStats();
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Add new task
function addTask() {
  const taskText = todoInput.value.trim();
  
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }
  
  const newTask = {
    id: generateId(),
    text: taskText,
    completed: false
  };
  
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  updateStats();
  todoInput.value = '';
}

// Delete task
function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  renderTasks();
  updateStats();
}

// Toggle task completion
function toggleTask(taskId) {
  tasks = tasks.map(task => 
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
  updateStats();
}

// Edit task
function editTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  const newText = prompt('Edit task:', task.text);
  
  if (newText !== null && newText.trim() !== '') {
    tasks = tasks.map(t => 
      t.id === taskId ? { ...t, text: newText.trim() } : t
    );
    saveTasks();
    renderTasks();
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update stats
function updateStats() {
  const active = tasks.filter(task => !task.completed).length;
  const completed = tasks.filter(task => task.completed).length;
  const total = tasks.length;
  
  activeCount.textContent = active;
  completedCount.textContent = completed;
  totalCount.textContent = total;
}

// Render tasks
function renderTasks() {
  todoList.innerHTML = '';
  
  if (tasks.length === 0) {
    todoList.innerHTML = '<div class="task-item" style="justify-content: center; color: #666;">No tasks yet. Add one above!</div>';
    return;
  }
  
  tasks.forEach(task => {
    const taskElement = createTaskElement(task);
    todoList.appendChild(taskElement);
  });
}

// Create task element
function createTaskElement(task) {
  const taskItem = document.createElement('div');
  taskItem.className = 'task-item';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = task.id;
  checkbox.className = 'hidden-check';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => toggleTask(task.id));
  
  const checkCustom = document.createElement('label');
  checkCustom.htmlFor = task.id;
  checkCustom.className = 'check-custom';
  
  const taskLabel = document.createElement('label');
  taskLabel.htmlFor = task.id;
  taskLabel.className = 'task-label';
  taskLabel.textContent = task.text;
  if (task.completed) {
    taskLabel.style.textDecoration = 'line-through';
    taskLabel.style.color = '#9ca3af';
  }
  
  const hoverActions = document.createElement('div');
  hoverActions.className = 'hover-actions';
  
  const editIcon = document.createElement('i');
  editIcon.className = 'fa-solid fa-pencil edit-icon';
  editIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    editTask(task.id);
  });
  
  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fa-solid fa-trash-can delete-icon';
  deleteIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  });
  
  hoverActions.appendChild(editIcon);
  hoverActions.appendChild(deleteIcon);
  
  taskItem.appendChild(checkbox);
  taskItem.appendChild(checkCustom);
  taskItem.appendChild(taskLabel);
  taskItem.appendChild(hoverActions);
  
  return taskItem;
}

// Event listeners
addBtn.addEventListener('click', addTask);

todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Initialize app
init();