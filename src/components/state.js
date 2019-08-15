import uuid from 'uuid/v4'
import EventEmitter from 'events'

class State extends EventEmitter {
  constructor(persistentStorage) {
    super()
    this.data = persistentStorage.read()
    this.writeData = () => persistentStorage.write(this.data)
    this.route = ''
    this.editingTodoTitle = null
    this.editingCategoryTitle = null
    this.editingItemID = null
  }
  
  persist() {
    this.writeData()
  }
  
  addCategory(title, id = null) {
    if (title) {
      if (title.trim().length === 0) {
        return false
      }
      title = title.trim()
    } else {
      return false
    }
    const category = {
      title: title,
      id: id || uuid()
    }
    this.data.categories = [...this.data.categories, category]
    this.emit('stateChanged')
    this.persist()
  }
  
  addTodo(params) {
    let { title, categoryTitle, dueDate = '', id = null } = params

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
      dueDate,
      category: categoryTitle,
      completed: false,
      id: id || uuid(),
      createdAt: Date.now(),
      modifiedAt: Date.now()
    }
  
    this.data.todos= [...this.data.todos, todo]
    this.emit('stateChanged')
    this.persist()
  }

  switchToEditingCategory(category) {
    this.editingCategoryTitle = category.title
    this.editingItemID = category.id
    this.emit('stateChanged')
  }

  updateCategoryTitle(title) {
    this.editingCategoryTitle = title
    this.emit('stateChanged')
  }

  editCategory(category) {
    let title = this.editingCategoryTitle
    if (title) {
      if (title.trim().length === 0) {
        return false
      }
      title = title.trim()
    } else {
      return false
    }
    this.data.todos.map(todo => {
      if (todo.category === category.title) {
        todo.category = title
      }
      return todo
    })
    category.title = title
    this.editingCategoryTitle = null
    this.editingItemID = null
    this.emit('stateChanged')
    this.persist()
  }

  switchToEditingTodo(todo) {
    this.editingTodoTitle = todo.title
    this.editingItemID = todo.id
    this.emit('stateChanged')
  }

  updateTodoTitle(title) {
    this.editingTodoTitle = title
    this.emit('stateChanged')
  }

  editTodo(todo) {
    let title = this.editingTodoTitle
    if (title) {
      if (title.trim().length === 0) {
        return false
      }
      title = title.trim()
    } else {
      return false
    }
    todo.title = title
    todo.modifiedAt = Date.now()
    this.editingTodoTitle = null
    this.editingItemID = null
    this.emit('stateChanged')
    this.persist()
  }

  deleteCategory(id) {
    this.data.categories = this.data.categories.filter(category => category.id !== id)
    this.emit('stateChanged')
    this.persist()
  }

  deleteTodo(id) {
    this.data.todos = this.data.todos.filter(todo => todo.id !== id)
    this.emit('stateChanged')
    this.persist();
  }

  toggleCompletionForTodo(id) {
    this.data.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
        todo.modifiedAt = Date.now()
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
    this.editingTodoTitle = null
    this.editingCategoryTitle = null
    this.editingItemID = null
    this.emit('stateChanged')
  }
}

export default State;
