import State from '../components/state'
import TemporaryStorage from '../components/temporaryStorage'

let db = new TemporaryStorage()
let repo = new State(db)

afterEach(() => {
  db.reset()
  repo = new State(db)
})

describe('testing addTodo', () => {
 
  test('persist and emit are called when addTodo', () => {
    const spyPersist = jest.spyOn(repo, 'persist')
    const spyEmit = jest.spyOn(repo, 'emit')
    repo.addTodo({
      title: 'hello', 
      category: 'notes', 
      dueDate: null, 
      id: 99
    })
    expect(spyPersist).toHaveBeenCalled()
    expect(spyEmit).toHaveBeenCalled()
  })
  
  test('addTodo adds a todo', () => {
    repo.addTodo({
      title: 'hello', 
      category: 'notes', 
      dueDate: null, 
      id: 99
    })
    expect(db.read().todos.length).toBe(1)
 
    repo.addTodo({
      title: 'hello', 
      category: 'notes', 
      dueDate: null, 
      id: 100
    })
    expect(db.read().todos.length).toBe(2)
 
    repo.addTodo({
      title: 'hello', 
      category: 'notes', 
      dueDate: null, 
      id: 101
    })
    expect(db.read().todos.length).toBe(3)
  })

  test('blank titles do not addTodo', () => {
    repo.addTodo({
      title: '  ', 
      category: 'notes', 
      dueDate: null, 
      id: 99
    })
    expect(db.read().todos.length).toBe(0)
  })
})

describe('testing toggleCompletionForTodo', () => {
  test('toggleCompletionForTodo toggles between true and false', () => {
    repo.addTodo({
      title: 'hello', 
      category: 'notes', 
      dueDate: null, 
      id: 99
    })
    repo.toggleCompletionForTodo(99)
    expect(db.read().todos[0].completed).toBeTruthy()
    repo.toggleCompletionForTodo(99)
    expect(db.read().todos[0].completed).toBeFalsy()
  })
})

describe('testing deleteTodo', () => {
  test('deleteTodo deletes the Todo', () => {
    repo.addTodo({
      title: 'hello', 
      category: 'notes', 
      dueDate: null, 
      id: 99
    })
    repo.deleteTodo(99)
    expect(db.read().todos.length).toBe(0)
  })
})

