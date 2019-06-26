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
    this.title = ""
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

  handleTitleChange(event) {
    this.title = event.target.value 
    this.emit('stateChanged')
  }

  addTodo(title, dueDate, id = null, createdAt = null) {
    const todo = {
      title,
      dueDate,
      completed: false,
      id: id || uuid(),
      createdAt: createdAt || Date.now(),
      modifiedAt: Date.now()
    }
    this.data.todos[dueDate] = this.data.todos[dueDate].concat(todo)
    this.persist()
    this.title = ""
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

  editTodo(id, title) {
    this.editingID ? (this.editingID = null) : (this.editingID = id)
    this.title = title
  }

  saveTodo = (title, dueDate, id, createdAt) => {
    if (this.selectedDate === dueDate) {
      this.data.todos[dueDate].map(todo => {
        if (todo.id === id) {
          todo.title = title
        }
        return todo
      })
      this.persist()
    } else {
      this.addTodo(title, dueDate, id, createdAt)
      this.deleteTodo(id) //removes from old list
    } 
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
