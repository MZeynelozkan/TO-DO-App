const mod_ic = document.querySelector(".mod_icon");

const textBx = document.querySelector(".to-do_val");

mod_ic.addEventListener("click", function () {
  const body = document.body;

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    body.style.backgroundColor = "#161722";
    mod_ic.src = "images/icon-sun.svg";
    textBx.style.backgroundColor = "#25273c";
    body.style.backgroundImage = "url(images/bg-desktop-dark.jpg)";
  } else {
    body.style.backgroundColor = "";
    mod_ic.src = "images/icon-moon.svg";
    textBx.style.backgroundColor = "#fff";
    body.style.backgroundImage = "url(images/bg-desktop-light.jpg)";
  }
});

const tobox = document.querySelector(".to");

const todoArr = [
  { id: 1, todo: "SA", isChecked: false },
  { id: 2, todo: "naber", isChecked: false },
];

function showTodos(todoArr) {
  tobox.innerHTML = "";
  todoArr.forEach((element) => {
    const html = `
      <div class="check-box_todo" draggable="true" id="todo_${element.id}">
        <input type="checkbox" id="check${element.id}" class="check" ${
      element.isChecked ? "checked" : ""
    } />
        <label for="check${element.id}" class="check-label"></label>
        <p class="todo">${element.todo}</p>
      </div>
    `;
    tobox.insertAdjacentHTML("beforeend", html);

    const newCheckbox = document.getElementById(`check${element.id}`);

    newCheckbox.addEventListener("change", function () {
      const todoId = parseInt(newCheckbox.id.replace("check", ""));

      const todo = todoArr.find((element) => element.id === todoId);

      todo.isChecked = newCheckbox.checked;

      updateItemsLeft(todoArr);
    });
  });
}

showTodos(todoArr);

// Add new Todos

textBx.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const newTodo = {
      id: todoArr.length + 1,
      todo: textBx.value,
      isChecked: false,
    };

    todoArr.push(newTodo);
    textBx.value = "";
    showTodos(todoArr);
    updateItemsLeft(todoArr);
  }
});

// items left

const itemsLeft = document.querySelector(".items-left");

function updateItemsLeft(todoArr) {
  const count = todoArr.filter((element) => !element.isChecked).length;
  itemsLeft.textContent = `${count} items left`;
}

updateItemsLeft(todoArr);

const checkboxes = document.querySelectorAll(".check");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const todoId = parseInt(checkbox.id.replace("check", ""));

    const todo = todoArr.find((element) => element.id === todoId);

    todo.isChecked = checkbox.checked;

    updateItemsLeft(todoArr);
  });
});

const allFilter = document.querySelector(".all");
const activeFilter = document.querySelector(".active");
const completedFilter = document.querySelector(".completed");

allFilter.addEventListener("click", function () {
  showTodos(todoArr);
  activeFilter.classList.remove("active-filter");
  completedFilter.classList.remove("active-filter");
  allFilter.classList.add("active-filter");
});

activeFilter.addEventListener("click", function () {
  const activeTodos = todoArr.filter((todo) => !todo.isChecked);
  allFilter.classList.remove("active-filter");
  completedFilter.classList.remove("active-filter");
  activeFilter.classList.add("active-filter");
  showTodos(activeTodos);
});

completedFilter.addEventListener("click", function () {
  const completedTodos = todoArr.filter((todo) => todo.isChecked);
  showTodos(completedTodos);
  allFilter.classList.remove("active-filter");
  activeFilter.classList.remove("active-filter");
  completedFilter.classList.add("active-filter");
});

const clearCompleted = document.querySelector(".clear");

clearCompleted.addEventListener("click", function () {
  const completedTodos = todoArr.filter((todo) => todo.isChecked);

  completedTodos.forEach((completedTodo) => {
    const index = todoArr.indexOf(completedTodo);
    todoArr.splice(index, 1);
  });

  showTodos(todoArr);

  updateItemsLeft(todoArr);
});
