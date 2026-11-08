const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#todo-btn");
const list = document.querySelector("#todo-list");

let todos = [];

try {
  const saved = localStorage.getItem("todos");
  const parsed = saved ? JSON.parse(saved) : [];
  todos = Array.isArray(parsed) ? parsed : [];
} catch (error) {
  console.error("Could not load saved todos:", error);
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoNodes(todo, index) {
  const li = document.createElement("li");
  const editBtn = document.createElement("button");
  editBtn.textContent = "EDIT";
  editBtn.classList.add("editBtn");
  editBtn.type = "button";
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "DELETE";
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.type = "button";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = !!todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    textSpan.style.textDecoration = todo.completed ? "line-through" : "none";
    saveTodos();
  });

  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.style.margin = "0 8px";
  if (todo.completed) {
    textSpan.style.textDecoration = "line-through";
  }

  editBtn.addEventListener("click", () => {
    const updatedText = window.prompt("Edit task:", todo.text);
    if (updatedText === null || !updatedText.trim()) {
      return;
    }

    todo.text = updatedText.trim();
    render();
    saveTodos();
  });

  deleteBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    render();
    saveTodos();
  });

  li.append(checkbox, textSpan, editBtn, deleteBtn);
  return li;
}

function render() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const node = createTodoNodes(todo, index);
    list.appendChild(node);
  });
}

function addTodo() {
  let text = input.value.trim();
  if (!text) {
    return;
  }

  todos.push({ text, completed: false });
  input.value = "";
  render();
  saveTodos();
}

addBtn.addEventListener("click", addTodo);
render();
