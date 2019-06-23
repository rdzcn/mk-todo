import uuid from "uuid/v4";
import EventEmitter from "events";

class State extends EventEmitter {
  constructor() {
    super();
    this.data = JSON.parse(localStorage.getItem("data")) || 
      { 
        todos: [],
        showCompleted: false
      };
    this.editingID = null;
    this.title = ""
  }

  persist() {
    const { data } = this;
    localStorage.setItem("data", JSON.stringify(data));
    this.emit("stateChanged")
  }

  handleTitleChange = event => {
    this.title += event.target.value
    //this.emit('stateChanged')
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
    this.data.todos = [...this.data.todos, todo]
    this.persist()
  }

  toggleCompletionForTodo(id) {
    this.data.todos.map(todo => {
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

  saveTodo(id) {
    this.data.todos.map(todo => {
      if (todo.id === id) {
        todo.title = this.title;
      }
      return todo;
    });
    this.persist();
    this.editingID = null
    this.title = null
  }

  deleteTodo(id) {
    this.data.todos = this.data.todos.filter(todo => todo.id !== id);
    this.persist();
  }

  toggleShowCompleted = () => {
    this.data.showCompleted = !this.data.showCompleted;
    this.persist();
  };
}

export default State;
