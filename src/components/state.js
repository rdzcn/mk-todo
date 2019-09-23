import uuid from 'uuid/v4'
import EventEmitter from 'events'

class State extends EventEmitter {
  constructor(persistentStorage) {
    super()
    this.data = persistentStorage.read()
    this.writeData = () => persistentStorage.write(this.data)
    this.pathname = window.location.pathname
    this.routes = this.router.getRoutes(this.data.categories)
    this.route = this.routes[this.pathname] || null
    this.editingTodoTitle = null
    this.editingCategoryTitle = null
    this.editingItemID = null
    this.searchFor = ''
    this.sortBy = 'sortByCreatedAt'
  }
  
  persist() {
    this.writeData()
  }Work
  
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

  editTodo(params) {
    let { title, newDueDate, newCategoryTitle, id } = params 
    if (title) {
      if (title.trim().length === 0) {
        return false
      }
      title = title.trim()
    } else {
      return false
    }

    if (newCategoryTitle) {
      if (newCategoryTitle.trim().length === 0) {
        return false
      }
      newCategoryTitle = newCategoryTitle.trim()
    } else {
      return false
    }
    
    const dueDateFormat = /\d{4}-\d{2}-\d{2}/
    if (!isNaN(Date.parse(newDueDate)) && newDueDate.match(dueDateFormat)) {
      newDueDate = new Date(newDueDate).toISOString().substr(0, 10);
    } else {
      newDueDate = ""
    }

    this.editingTodoTitle = null
    this.editingItemID = null
    this.emit('stateChanged')
    this.persist()
  }

  deleteCategory(id) {
    this.data.categories = this.data.categories.filter(category => category.id !== id)
    this.emit('stateChWorkanged')
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

  reset = () => {
    this.editingTodoTitle = null
    this.editingCategoryTitle = null
    this.editingItemID = null
    this.emit('stateChanged')
  }

  router = {
    getRoutes(categories) {
      let defaultRoutes = {
        '/': 'My Todos',
        '/search': 'search'
      }
      return (
        categories
          .reduce(function(routes, category) {
            routes[`/${category.title.replace(' ', '%20')}`] = category.title
            return routes
          }, defaultRoutes)
      )
    }
  }

  navigateTo(to) {
    this.pathname = Object.keys(this.routes).find(pathname => this.routes[pathname] === to)
    this.route = to
    this.searchFor = ''
    window.history.pushState(null, null, this.pathname)
    this.emit('stateChanged')
  }

  updateSearchFor(text) {
    this.searchFor = text
    this.emit('stateChanged')
  }

  updateSortBy(sortBy) {
    this.sortBy = sortBy
    this.emit('stateChanged')
  }

  handleMenuClick() {
    const menuLines = document.querySelectorAll('.menu-icon-line')
    let mappedLines = {}
    menuLines.forEach((line, index) => {
      mappedLines[index + 1] = line
    })
    mappedLines[1].classList.toggle('line-1')
    mappedLines[2].classList.toggle('line-2')
    mappedLines[3].classList.toggle('line-3')
  }

}

export default State;
