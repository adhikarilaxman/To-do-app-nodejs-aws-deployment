const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function fetchTodos() {
  fetch('/api/todos')
    .then(res => res.json())
    .then(todos => {
      todoList.innerHTML = '';
      todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        const btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.className = 'delete-btn';
        btn.onclick = () => deleteTodo(todo.id);
        li.appendChild(btn);
        todoList.appendChild(li);
      });
    });
}

function addTodo(e) {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;
  fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  })
    .then(res => res.json())
    .then(() => {
      todoInput.value = '';
      fetchTodos();
    });
}

todoForm.addEventListener('submit', addTodo);

function deleteTodo(id) {
  fetch(`/api/todos/${id}`, { method: 'DELETE' })
    .then(() => fetchTodos());
}

fetchTodos();
