document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTaskButton.addEventListener("click", () => {
    const tasktext = todoInput.value.trim();
    if (tasktext === "") return;

    const newtask = {
      id: Date.now(),
      text: tasktext,
      completed: false,
    };

    tasks.push(newtask);
      saveTasks();
      renderTask(newtask);
    todoInput.value = ""; //clear input
    console.log(tasks);
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `;
    li.addEventListener("click", (e) => {
      if (e.targeted.tagNmae === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation(); //prevent toggle from firing
        tasks = tasks.filter(t => t.id == task.id);
        li.remove();
        saveTasks();
    });

    todoList.appendChild(li);
  }
          
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
