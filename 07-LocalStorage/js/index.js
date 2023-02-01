const submitBtn = document.getElementById("new-task__submit");
const delBtn = document.getElementById("del-task__submit");

const taskInput = document.getElementById("new-task__input");
const tasksContainer = document.getElementById("tasks_container");

document.addEventListener("DOMContentLoaded", function () {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (!tasks) {
    const p = document.createElement("p");
    const text = document.createTextNode("No hay elementos.");
    p.appendChild(text);
    tasksContainer.appendChild(p);
  } else {
    if (tasks.length > 0) {
      for (let i = 0; i < tasks.length; i++) {
        showTasks(tasks, i);
      }
    } else {
      const p = document.createElement("p");
      const text = document.createTextNode("No hay elementos.");
      p.appendChild(text);
      tasksContainer.appendChild(p);
    }
  }

  submitBtn.addEventListener("click", function () {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = taskInput.value;

    if (newTask) {
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      tasksContainer.innerHTML = "";

      for (let i = 0; i < tasks.length; i++) {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const text = document.createTextNode(tasks[i]);
        p.appendChild(text);

        const button = document.createElement("button");
        const textDel = document.createTextNode("Delete");

        button.appendChild(textDel);
        button.onclick = () => {
          deleteItem(i);
        };

        div.appendChild(p);
        div.appendChild(button);

        tasksContainer.appendChild(div);
      }
    }

    taskInput.value = "";
  });

  function showTasks(tasks, i) {
    const div = document.createElement("div");
    const p = document.createElement("p");
    const text = document.createTextNode(tasks[i]);
    p.appendChild(text);

    const button = document.createElement("button");
    const textDel = document.createTextNode("Delete");

    button.appendChild(textDel);
    button.onclick = () => {
      deleteItem(i);
    };

    div.appendChild(p);
    div.appendChild(button);

    tasksContainer.appendChild(div);
  }

  function deleteItem(item) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(item, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    tasksContainer.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
      showTasks(tasks, i);
    }
  }
});
