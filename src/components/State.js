import uuid from "uuid/v4";
import EventEmitter from "events";
import { generateCalender } from "../utils/helpers"


class State extends EventEmitter {
  constructor() {
    super();
    this.data = JSON.parse(localStorage.getItem("data")) || 
      { 
        showCompleted: false,
        todos: generateCalender()
      };
    this.editingID = null
    this.selectedDate = new Date().toISOString().substr(0, 10)
  }

  persist() {
    const { data } = this;
    localStorage.setItem("data", JSON.stringify(data));
    this.emit("stateChanged")
  }

  updateSelectedDate(event) {
    this.selectedDate = event.target.innerHTML
    this.emit("stateChanged")
  }

  addTodo(title, dueDate) {
    const todo = {
      title,
      dueDate,
      completed: false,
      id: uuid(),
      createdAt: Date.now(),
      modifiedAt: Date.now()
    }
    this.data.todos[dueDate] = this.data.todos[dueDate].concat(todo)
    this.persist()
  }

  toggleCompletionForTodo(id) {
    this.data.todos[this.selectedDate].map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        todo.modifiedAt = Date.now();
      }
      return todo;
    });
    this.persist();
  }

  editTodo(id) {
    this.editingID ? (this.editingID = null) : (this.editingID = id)
  }

  saveTodo(id, title) {
    this.data.todos[this.selectedDate].map(todo => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    });
    this.persist();
    this.editingID = null
  }

  deleteTodo(id) {
    this.data.todos[this.selectedDate] = this.data.todos[this.selectedDate].filter(todo => todo.id !== id)
    this.persist();
  }

  toggleShowCompleted = () => {
    this.data.showCompleted = !this.data.showCompleted;
    this.persist();
  };
}

export default State;
