const submitBtn = document.getElementById("new-task__submit");
const delBtn = document.getElementById("del-task__submit");

const taskInput = document.getElementById("new-task__input");
const tasksContainer = document.getElementById("tasks_container");

const menu = document.getElementById("menu");

let editing = false;

document.addEventListener("DOMContentLoaded", function () {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (!tasks) {
    const p = document.createElement("p");
    const text = document.createTextNode("Add a new task.");
    p.appendChild(text);
    tasksContainer.appendChild(p);
  } else {
    if (tasks.length > 0) {
      for (let i = 0; i < tasks.length; i++) {
        showTasks(tasks, i);
      }
    } else {
      const p = document.createElement("p");
      const text = document.createTextNode("Add a new task.");
      p.appendChild(text);
      tasksContainer.appendChild(p);
    }
  }

  submitBtn.addEventListener("click", function () {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = taskInput.value;

    if (newTask) {
      tasks.push(newTask);
      tasks.reverse();
      localStorage.setItem("tasks", JSON.stringify(tasks));

      tasksContainer.innerHTML = "";

      for (let i = 0; i < tasks.length; i++) {
        showTasks(tasks, i);
      }
    }

    taskInput.value = "";
  });

  function showTasks(tasks, i) {
    if (tasks.length === 0) {
      const p = document.createElement("p");
      const text = document.createTextNode("Add a new task.");
      p.appendChild(text);
      tasksContainer.appendChild(p);
      tasksContainer.style.overflowY = "hidden";
    } else {
      const div = document.createElement("div");
      const controlPanel = document.createElement("aside");
      const p = document.createElement("p");
      const text = document.createTextNode(tasks[i]);

      const button = document.createElement("button");
      const textDel = document.createTextNode("Delete");

      const upBtn = document.createElement("button");
      const textUp = document.createTextNode("Edit");
      p.appendChild(text);

      button.appendChild(textDel);
      upBtn.appendChild(textUp);

      button.onclick = () => {
        deleteItem(i);
      };

      upBtn.onclick = () => {
        if (!editing) {
          update(i);
        } else {
          alert("You're editing a task right now.");
        }
      };

      div.appendChild(p);
      div.appendChild(controlPanel);
      controlPanel.appendChild(button);
      controlPanel.appendChild(upBtn);

      tasksContainer.appendChild(div);
    }
  }

  function deleteItem(item) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(item, 1);
    tasks.reverse();

    localStorage.setItem("tasks", JSON.stringify(tasks));

    tasksContainer.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
      showTasks(tasks, i);
    }
  }

  function update(item) {
    if (!editing) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const newTask = document.getElementById("update-task__input");
      const confirmBtn = document.getElementById("confirm-task__btn");

      editing = true;
      menu.style.display = "block";
      newTask.value = tasks[item];

      submitBtn.disabled = true;
      taskInput.disabled = true;
      taskInput.style.display = "none";
      submitBtn.style.display = "none";

      confirmBtn.onclick = () => {
        if (newTask.value != "") {
          tasks[item] = newTask.value;
          tasks.reverse();

          localStorage.setItem("tasks", JSON.stringify(tasks));
          tasksContainer.innerHTML = "";

          for (let j = 0; j < tasks.length; j++) {
            showTasks(tasks, j);
          }

          editing = false;
          newTask.value = "";
          menu.style.display = "none";
          taskInput.style.display = "block";
          submitBtn.style.display = "block";
          submitBtn.disabled = false;
          taskInput.disabled = false;
        } else {
          alert("Ups, You need to enter a name");
        }
      };
    }
  }
});
