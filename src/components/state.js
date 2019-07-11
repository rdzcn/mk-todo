import uuid from "uuid/v4";
import EventEmitter from "events";

class State extends EventEmitter {
  constructor(db) {
    super()
    this.data = db.read()
    this.writeData = () => db.write(this.data)
    this.editingID = null
    this.editingTitle = ""
    this.selectedCategory = "My Todos"
  }

  persist() {
    this.writeData();
  }

  updateSelectedCategory = category => {
    this.selectedCategory = category;
    this.emit("stateChanged");
  }

  updateEditingTitleChange(title) {
    this.editingTitle = title
    this.emit("stateChanged");
  }

  addTodo = (params) => {
    
    let { title, dueDate = null } = params
    const category = this.selectedCategory
    
    if (title) {
      if (title.trim() === 0) {
        return false
      }
      title = title.trim()
    } else {
      return false
    } 
    
    const dueDateFormat = /\d{4}-\d{2}-\d{2}/
    
    if (dueDate && dueDate.match(dueDateFormat)) {
      dueDate = new Date(dueDate).toISOString().substr(0, 10);
    } else {
      dueDate = ""
    }

    const todo = {
      title,
      category,
      dueDate,
      completed: false,
      id: uuid(),
      createdAt: Date.now(),
      modifiedAt: Date.now()
    }

    this.data.todos= [...this.data.todos, todo];
    this.persist();
    this.editingTitle = ""
  }

  toggleCompletionForTodo(id) {
    this.data.todos.map(todo => {
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

  saveTodo = (params) => {
    let { title, category, dueDate } = params
    
    this.data.todos.map(todo => {
      if (todo.id === this.editingID) {
        todo.title = title
        todo.category = category
        todo.dueDate = dueDate
      }
      return todo
    })
    this.persist()
    this.editingID = null;
  };

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
