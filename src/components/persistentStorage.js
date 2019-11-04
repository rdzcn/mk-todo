const initialState = { 
  showCompleted: false,
  todos: [], 
  categories: [
    {id: 0, title: 'My Todos'},
    {id: 1, title: 'Work'},
    {id: 2, title: 'Home'},
    {id: 3, title: 'Groceries'}
  ]
}

class PersistentStorage {

  read() {
    return JSON.parse(localStorage.getItem('data')) || initialState
  }

  write(data) {
    localStorage.setItem('data', JSON.stringify(data))
  }
}

export default PersistentStorage