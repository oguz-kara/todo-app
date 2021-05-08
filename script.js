const DataController = (function () {
  let todos = [
    {
      id: 1,
      title: "deneme 1",
      completed: false,
    },
    {
      id: 2,
      title: "deneme 1",
      completed: false,
    },
    {
      id: 3,
      title: "deneme 1",
      completed: false,
    },
  ];

  let currentTodo = {};

  return {
    addTodo: function (todo) {
      todos.push(todo);
    },
    getTodo: function (id) {
      return todos.find((item) => {
        return item.id == id;
      });
    },
    setCompleted: function (id) {
      todos.forEach((item) => {
        if (item.id == id) {
          item.completed = !item.completed;
        }
      });
    },
    deleteTodo: function (id) {
      todos = todos.filter((item) => {
        if (id != item.id) {
          return item;
        }
      });
    },
    updateTodo: function (oldTodo, newTodo) {
      todos = todos.map((item, index) => {
        if (oldTodo.id !== item.id) {
          return item;
        } else {
          return { ...newTodo, id: oldTodo.id };
        }
      });
    },
    getTodos: function () {
      return todos;
    },
    getTotal: function () {
      return todos.length;
    },
    clearTodos: function () {
      todos = [];
    },
  };
})();

const UIController = (function () {
  const Selectors = {
    todoInput: "#todo-input",
    clearBtn: "#clear",
    listEl: ".list ul",
    add: "#add",
    clear: "#clear",
  };

  return {
    getSelectors: function () {
      return Selectors;
    },
    printTodos: function (todos) {
      let html = "";
      todos.forEach((todo) => {
        html += todoListEl(todo);
      });
      document.querySelector(".list ul").innerHTML = html;
    },
    todoCompleted: function () {},
  };
})(DataController);

const App = (function (data, ui) {
  window.addEventListener("DOMContentLoaded", (e) => {
    ui.printTodos(data.getTodos());
  });
  document
    .querySelector(ui.getSelectors().add)
    .addEventListener("click", addTodo);

  document
    .querySelector(ui.getSelectors().clear)
    .addEventListener("click", clearTodos);

  // App functions

  function addTodo(e) {
    const todoInputEl = document.querySelector(ui.getSelectors().todoInput);
    if (todoInputEl.value) {
      data.addTodo({
        id: generateId(),
        title: todoInputEl.value,
      });
      ui.printTodos(data.getTodos());
      todoInputEl.value = "";
    }
  }
  function clearTodos(e) {
    data.clearTodos();
    ui.printTodos(data.getTodos());
  }
})(DataController, UIController);

// GLOBAL EVENT FUNCTIONS

function checkTodo(e) {
  const id = e.currentTarget.dataset.id;
  DataController.setCompleted(id);
  UIController.printTodos(DataController.getTodos());
  console.log({ id });
  console.log(DataController.getTodo(id));
}

function deleteTodo(e) {
  e.stopPropagation();
  const id = e.currentTarget.dataset.id;
  DataController.deleteTodo(id);
  console.log(DataController.getTodos());
  UIController.printTodos(DataController.getTodos());
}

// GLOBAL HELPER FUNCTIONS

function todoListEl(todo) {
  const { id, title, completed } = todo;
  return `
    <li>
    <div class="todo" onclick="checkTodo(event)" data-id=${id}>
      <span class=${completed ? "completed" : ""}>
        <b>${title}</b>
      </span>
      <div class="todo-actions">
        <button class="delete todo-action" onclick="deleteTodo(event)" type="submit" data-id=${id}>
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </li>
    `;
}

function generateId() {
  let newId = 0;
  switch (DataController.getTotal()) {
    case 0:
      return 1;
    case 1:
      DataController.getTodos().forEach((item) => {
        newId += item.id;
      });
      return newId + 1;
    default:
      DataController.getTodos().forEach((item) => {
        newId += item.id;
      });
      return newId;
  }
}
