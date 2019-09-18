
class TemporaryStorage {
  
  constructor() {
    this.data = {
      showCompleted: false,
      todos: [], 
      categories: [
        {id: 0, title: 'My Todos'},
        {id: 1, title: 'Work'},
        {id: 2, title: 'Home'},
        {id: 3, title: 'Groceries'}
      ]
    }
  }
  read() {
    return this.data
  }

  write(newData) {
    this.data = newData
  }

  reset() {
    this.data = {
      showCompleted: false,
      todos: [], 
      categories: [
        {id: 0, title: 'My Todos'},
        {id: 1, title: 'Work'},
        {id: 2, title: 'Home'},
        {id: 3, title: 'Groceries'}
      ]
    }
  }
}

export default TemporaryStorage