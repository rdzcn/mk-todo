import uuid from "uuid/v4";
import EventEmitter from "events";

class State extends EventEmitter {
  constructor(db) {
    super()
    this.data = db.read()
    this.writeData = () => db.write(this.data)
    this.editingID = null
    this.editingTitle = ""
    this.category = "notes"
  }

  persist() {
    this.writeData();
  }

  updateCategory(category) {
    this.category = category;
    this.emit("stateChanged");
  }

  handleEditingTitleChange(event) {
    this.editingTitle = event.target.value;
    this.emit("stateChanged");
  }

  addTodo(title, category, dueDate, id = null, createdAt = null, modifiedAt = null) {
    title = title.trim();
    if (title.length === 0) {
      return false
    }
    const dueDateFormat = /\d{4}-\d{2}-\d{2}/
    if (dueDate.match(dueDateFormat)) {
      dueDate = new Date(dueDate).toISOString().substr(0, 10);
    } else {
      dueDate = ""
    }
    const todo = {
      title,
      category,
      dueDate,
      completed: false,
      id: id || uuid(),
      createdAt: createdAt || Date.now(),
      modifiedAt: modifiedAt || Date.now()
    }
    if (!this.data.todos.hasOwnProperty(category)) {
      this.data.todos[category] = [];
    }
    this.data.todos[category] = [...this.data.todos[category], todo];
    this.persist();
    this.editingTitle = ""
  }

  toggleCompletionForTodo(id) {
    this.data.todos[this.category].map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        todo.modifiedAt = Date.now();
      }
      return todo
    })
    this.persist()
  }

  editTodo(id, title = "") {
    if (this.editingID) {
      this.editingID = null
    } else {
      this.editingID = id
    }
    this.editingTitle = title
    this.emit('stateChanged')
  }

  saveTodo = (title, category, dueDate, id, createdAt) => {
    if (this.category === category) {
      this.data.todos[category].map(todo => {
        if (todo.id === id) {
          todo.title = title
          todo.dueDate = dueDate
        }
        return todo;
      });
      this.persist();
    } else {
      this.addTodo(title, category, dueDate, id, createdAt);
      this.deleteTodo(id);
    }
    this.editingID = null;
  };

  deleteTodo(id) {
    this.data.todos[this.category] = this.data.todos[this.category].filter(todo => todo.id !== id);
    this.persist();
  }

  toggleShowCompleted = () => {
    this.data.showCompleted = !this.data.showCompleted;
    this.persist();
  };
}

export default State;
