import uuid from "uuid/v4";
import EventEmitter from "events";

class State extends EventEmitter {
  constructor(db) {
    super();
    this.data = db.read();
    this.writeData = () => db.write(this.data);
    this.editingID = null;
    this.selectedDate = new Date().toISOString().substr(0, 10);
    this.title = "";
  }

  persist() {
    this.writeData();
  }

  updateSelectedDate(event) {
    this.selectedDate = event.target.innerHTML;
    this.emit("stateChanged");
  }

  handleTitleChange(event) {
    this.title = event.target.value;
    this.emit("stateChanged");
  }

  addTodo(title, dueDate, id = null, createdAt = null, modifiedAt = null) {
    dueDate = new Date(dueDate).toISOString().substr(0, 10);
    title = title.trim();
    if (title.length === 0) {
      return false
    }
    const todo = {
      title,
      dueDate,
      completed: false,
      id: id || uuid(),
      createdAt: createdAt || Date.now(),
      modifiedAt: modifiedAt || Date.now()
    }
    if (!this.data.todos.hasOwnProperty(dueDate)) {
      this.data.todos[dueDate] = [];
    }
    this.data.todos[dueDate] = [...this.data.todos[dueDate], todo];
    this.persist();
    this.title = "";
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
    this.editingID ? (this.editingID = null) : (this.editingID = id);
    this.title = title;
  }

  saveTodo = (title, dueDate, id, createdAt) => {
    if (this.selectedDate === dueDate) {
      this.data.todos[dueDate].map(todo => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      });
      this.persist();
    } else {
      this.addTodo(title, dueDate, id, createdAt);
      this.deleteTodo(id);
    }
    this.editingID = null;
  };

  deleteTodo(id) {
    this.data.todos[this.selectedDate] = this.data.todos[
      this.selectedDate
    ].filter(todo => todo.id !== id);
    this.persist();
  }

  toggleShowCompleted = () => {
    this.data.showCompleted = !this.data.showCompleted;
    this.persist();
  };
}

export default State;
