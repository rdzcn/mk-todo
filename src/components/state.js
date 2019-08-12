import uuid from 'uuid/v4'
import EventEmitter from 'events'

class State extends EventEmitter {
  constructor(persistentStorage) {
    super()
    this.data = persistentStorage.read()
    this.writeData = () => persistentStorage.write(this.data)
    this.editingTitle = null
    this.editingCategory = null
  }
  
  persist() {
    this.writeData()
  }
  
  addCategory(categoryTitle, id = null) {
    if (categoryTitle) {
      if (categoryTitle.trim().length === 0) {
        return false
      }
      categoryTitle = categoryTitle.trim()
    } else {
      return false
    }
    const category = {
      title: categoryTitle,
      id: id || uuid()
    }
    this.data.categories = [...this.data.categories, category]
    this.emit('stateChanged')
    this.persist()
  }
  
  addTodo(params) {
    let { title, category, dueDate = '', id = null } = params
  
    if (title) {
      if (title.trim().length === 0) {
        return false
      }
      title = title.trim()
    } else {
      return false
    }
  
    const dueDateFormat = /\d{4}-\d{2}-\d{2}/
    if (!isNaN(Date.parse(dueDate)) && dueDate.match(dueDateFormat)) {
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
  
    this.data.todos= [...this.data.todos, todo]
    this.emit('stateChanged')
    this.persist()
  }

  saveCategory(index) {
    const { editingCategory, data } = this
    const { categories } = data
    data.todos.map(todo => {
      if (todo.category === categories[index]) {
        todo.category = editingCategory
      }
      return todo
    })
    this.data.categories[index] = editingCategory
    this.editingCategory = null
    this.emit('stateChanged')
    this.persist()
  }

  saveTodo(params) {
    let { title, category, dueDate, id } = params

    if (title) {
      if (title.trim().length === 0) {
        return false
      }
      title = title.trim()
    } else {
      return false
    }

    const editedTodo = { id, title, dueDate, category }
    this.data.todos.map(todo => {
      if (todo.id === id) {
        Object.assign(todo, editedTodo)
      } 
      return todo
    })
    this.editingTitle = null
    this.emit('stateChanged')
    this.persist()
  }

  deleteCategory(category) {
    const index = this.data.categories.indexOf(category)
    this.data.categories.splice(index, 1)
    this.emit('stateChanged')
    this.persist()
  }

  deleteTodo(id) {
    this.data.todos = this.data.todos.filter(todo => todo.id !== id)
    this.emit('stateChanged')
    this.persist();
  }

  updateEditingCategory(category) {
    this.editingCategory = category
    this.emit('stateChanged')
  }

  updateEditingTitle(title) {
    this.editingTitle = title
    this.emit('stateChanged');
  }

  toggleCompletionForTodo(id) {
    this.data.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        todo.modifiedAt = Date.now();
      }
      return todo
    })
    this.emit('stateChanged')
    this.persist()
  }

  toggleShowCompleted = () => {
    this.data.showCompleted = !this.data.showCompleted
    this.emit('stateChanged')
    this.persist()
  };

  cancel = () => {
    this.editingTitle = null
    this.editingCategoryID = null
    this.editingCategory = ""
    this.emit('stateChanged')
  }
}

export default State;
