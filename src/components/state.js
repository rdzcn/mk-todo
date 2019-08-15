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

  switchToEditingCategory(id) {
    const category = this.data.categories.find(category => category.id === id)
    this.editingCategoryTitle = category.title
    this.editingItemID = id
    this.emit('stateChanged')
  }

  updateCategoryTitle(title) {
    this.editingCategoryTitle = title
    this.emit('stateChanged')
  }

  editCategory(id) {
    let category = this.data.categories.find(category => category.id === id)
    this.data.todos.map(todo => {
      if (todo.category === category.title) {
        todo.category = this.editingCategoryTitle
      }
      return todo
    })
    category.title = this.editingCategoryTitle
    this.editingCategoryTitle = null
    this.editingItemID = null
    this.emit('stateChanged')
    this.persist()
  }

  editTodo(params) {
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

  updateTodo(todo) {
    this.editingTodoTitle = todo.title
    this.editingItemID = todo.id
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
    this.editingTodoTitle = null
    this.editingCategoryTitle = null
    this.editingItemID = null
    this.emit('stateChanged')
  }
}

export default State;
