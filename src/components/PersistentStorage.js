import EventEmitter from 'events'

class PersistentStorage extends EventEmitter {

  read() {
    const data = JSON.parse(localStorage.getItem('data')) || 
      { 
        showCompleted: false,
        categories: ['My Todos', 'Home Related', 'Work Related', 'Groceries'],
        todos: [] 
      }
    return data
  }

  write(data) {
    localStorage.setItem('data', JSON.stringify(data))
    this.emit('dataChanged')
  }
}

export default PersistentStorage