import uuid from 'uuid/v4'
import EventEmitter from 'events'
import Router from './router'

class State extends EventEmitter {
  constructor(db) {
    super()
    this.data = db.read()
    this.writeData = () => db.write(this.data)
    this.editingID = null
    this.editingTitle = ''
    this.editingCategoryID = null
    this.editingCategory = ''
    this.route = "My Todos"
    this.searchText = ''
    this.readOnly = true
  }

  persist() {
    this.writeData();
    this.emit('stateChanged')
  }

  deleteCategory = category => {
    const index = this.data.categories.indexOf(category) 
    this.data.categories.splice(index, 1)
    this.persist()
  }
  
  deleteTodo(id) {
    this.data.todos = this.data.todos.filter(todo => todo.id !== id);
    this.persist();
  }
  
  editCategory = category => {
    if (this.editingCategory !== "") {
      return
    } else {
      this.editingCategoryID = this.data.categories.indexOf(category)
      this.editingCategory = category
      this.emit('stateChanged')
    }
  }
  
  editTodo(id, title) {
    if (this.editingID) {
      return
    } else {
      this.editingID = id
      this.editingTitle = title
      this.emit('stateChanged')
    }
  }

  updateRoute = route => {
    this.route = route
    this.emit("stateChanged")
  }
  
  updateEditingCategory(category) {
    this.editingCategory = category
    console.log(this.editingCategory)
    this.emit('stateChanged')
  }
  
  updateEditingTitle(title) {
    this.editingTitle = title
    this.emit('stateChanged');
  }

  updateSearchText(text) {
    this.route = `Searching for...${text}`
    this.searchText = text
    this.emit('stateChanged')
  }
  
  saveCategory = () => {
    const { editingCategory, editingCategoryID } = this
    const prevCategory = this.data.categories[editingCategoryID]
    this.data.todos.map(todo => {
      if (todo.category === prevCategory) {
        todo.category = editingCategory
      }
      return todo
    })
    this.data.categories[this.editingCategoryID] = editingCategory
    this.editingCategoryID = null
    this.editingCategory = ""
    this.route = editingCategory
    this.persist()
  }
  
  saveTodo = (params) => {
    let { title, category, dueDate } = params
    
    this.data.todos
      .filter(todo => todo.id === this.editingID)
      .map(todo => {
         todo.title = title
         todo.category = category
         todo.dueDate = dueDate
         return todo
      })
    this.editingID = null
    this.editingTitle = ''
    this.persist()
  };
  
  addNewCategory = categoryName => {
    if (categoryName) {
      if (categoryName.trim() === 0) {
        return false
      }
      categoryName = categoryName.trim()
    } else {
      return false
    } 
    this.data.categories = this.data.categories.concat(categoryName)
    this.persist()
  }

  addTodo = (params) => {
    
    let { title, dueDate = null, id = null } = params
    const category = this.route
    
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
      id: id || uuid(),
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

  toggleShowCompleted = () => {
    this.data.showCompleted = !this.data.showCompleted;
    this.persist();
  };

  cancel = () => {
    this.editingID = null
    this.editingTitle = ""
    this.editingCategoryID = null
    this.editingCategory = ""
    this.route = "My Todos"
    this.searchText = ""
    this.emit('stateChanged')
  }
}

export default State;
