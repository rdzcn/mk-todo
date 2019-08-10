
class TemporaryStorage {
  
  constructor() {
    this.data = {
      showCompleted: false,
      categories: ['My Todos', 'Home Related', 'Work Related', 'Groceries'],
      todos: [] 
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
      categories: ['My Todos', 'Home Related', 'Work Related', 'Groceries'],
      todos: [] 
    }
  }
}

export default TemporaryStorage