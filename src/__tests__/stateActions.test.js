import State from '../components/state'
import TemporaryStorage from '../components/temporaryStorage'

let temporaryStorage = new TemporaryStorage()
let state = new State(temporaryStorage)

beforeEach(() => {
  temporaryStorage.reset()
  state = new State(temporaryStorage)
})

describe('testing addTodo', () => {
 
  test('persist and emit are called when addTodo', () => {
    const spyPersist = jest.spyOn(state, 'persist')
    const spyEmit = jest.spyOn(state, 'emit')
    state.addTodo({
      title: 'hello', 
      category: 'notes', 
      dueDate: null, 
      id: 99
    })
    expect(spyPersist).toHaveBeenCalled()
    expect(spyEmit).toHaveBeenCalled()
  })
  
  test('addTodo adds a todo', () => {
    state.addTodo({
      title: 'hello', 
      category: 'notes', 
      dueDate: null, 
      id: 99
    })
    expect(temporaryStorage.read().todos.length).toBe(1)
 
    state.addTodo({
      title: 'hello', 
      category: 'notes', 
      dueDate: null, 
      id: 100
    })
    expect(temporaryStorage.read().todos.length).toBe(2)
 
    state.addTodo({
      title: 'hello', 
      category: 'notes', 
      dueDate: null, 
      id: 101
    })
    expect(temporaryStorage.read().todos.length).toBe(3)
  })

  test('blank titles do not addTodo', () => {
    state.addTodo({
      title: '  ', 
      category: 'notes', 
      dueDate: null, 
      id: 99
    })
    expect(temporaryStorage.read().todos.length).toBe(0)
  })
})

describe('testing toggleCompletionForTodo', () => {
  test('toggleCompletionForTodo toggles between true and false', () => {
    state.addTodo({
      title: 'hello', 
      category: 'notes', 
      dueDate: null, 
      id: 99
    })
    state.toggleCompletionForTodo(99)
    expect(temporaryStorage.read().todos[0].completed).toBeTruthy()
    state.toggleCompletionForTodo(99)
    expect(temporaryStorage.read().todos[0].completed).toBeFalsy()
  })
})

describe('testing deleteTodo', () => {
  test('deleteTodo deletes the Todo', () => {
    state.addTodo({
      title: 'hello', 
      category: 'notes', 
      dueDate: null, 
      id: 99
    })
    state.deleteTodo(99)
    expect(temporaryStorage.read().todos.length).toBe(0)
  })
})

describe('testing saveTodo', () => {
  test('saveTodo save the Todo with new information', () => {
    state.addTodo({
      title: 'hello', 
      category: 'notes', 
      dueDate: null, 
      id: 99
    })
    state.saveTodo({title: 'world', category: 'work', dueDate: '2019-10-10', id: 99})
    expect(temporaryStorage.read().todos[0].title).toBe('world')
    expect(temporaryStorage.read().todos[0].category).toBe('work')
    expect(temporaryStorage.read().todos[0].dueDate).toBe('2019-10-10')
  })

  test('blank titles do not saveTodo', () => {
    state.addTodo({
      title: 'hello', 
      category: 'notes', 
      dueDate: null, 
      id: 99
    })
    state.saveTodo({title: '  ', category: 'work', dueDate: '2019-10-10', id: 99})
    expect(temporaryStorage.read().todos[0].title).toBe('hello')
  })
})

