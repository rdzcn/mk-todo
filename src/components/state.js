import uuid from 'uuid/v4'
import EventEmitter from 'events'

class State extends EventEmitter {
  constructor(persistentStorage) {
    super()
    this.data = persistentStorage.read()
    this.writeData = () => persistentStorage.write(this.data)
    this.editingTitle = null
    this.editingCategoryID = null
    this.editingCategory = ''
  }

  persist() {
    this.writeData()
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

  editCategory(category) {
    if (this.editingCategory !== "") {
      return
    } else {
      this.editingCategoryID = this.data.categories.indexOf(category)
      this.editingCategory = category
      this.emit('stateChanged')
    }
  }

  editTodo(title) {
    if (!this.readOnly) {
      return
    } else {
      this.readOnly = false
      this.editingTitle = title
      this.emit('stateChanged')
    }
  }

  updateEditingCategory(category) {
    this.editingCategory = category
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

  saveCategory() {
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

    this.data.todos
      .filter(todo => todo.id === id)
      .map(todo => {
         todo.title = title
         todo.category = category
         todo.dueDate = dueDate
         return todo
      })
    this.editingID = null
    this.editingTitle = ''
    this.emit('stateChanged')
    this.persist()
  };

  addCategory(category) {
    if (category) {
      if (category.trim() === 0) {
        return false
      }
      category = category.trim()
    } else {
      return false
    }
    this.data.categories = [...this.data.categories, category]
    this.emit('stateChanged')
    this.persist()
  }

  addTodo(params) {
    let { title, category, dueDate = "", id = null } = params

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
