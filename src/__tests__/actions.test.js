import State from '../components/state'
import TemporaryStorage from '../components/temporaryStorage'
import { data } from '../data/temporaryData'
import Router from '../components/router'

let db = new TemporaryStorage(data)
let state = new State(db)
let router = new Router(db)



const todo = {
  category: 'notes',
  completed: true,
  createdAt: Date.now(),
  dueDate: '',
  id: 12,
  modifiedAt: Date.now(),
  title: 'hello'
}

const dbAfter = {...db} 
dbAfter.data.todos = dbAfter.data.todos.concat(todo)

describe('testing addTodo', () => {
  test('persist() to be called when addTodo() is called', () => {
    const spyPersist = jest.spyOn(state, 'persist')
    const spyEmit = jest.spyOn(state, 'emit')

    state.addTodo({title: 'hello', category: 'notes', dueDate: null, id: 11})
    expect(spyPersist).toHaveBeenCalled()
    expect(spyEmit).toHaveBeenCalled()
  })

  test('null dueDate should add the task without a dueDate', () => {
    state.addTodo({title: 'hello', category: 'notes', dueDate: null, id: 12})
    expect(db).toEqual(dbAfter)
  })
  
  test('A new todo must have a title, title cannot be empty', () => {
    expect(state.addTodo({title: ' ', category: 'notes', dueDate: ''})).toBeFalsy()
    expect(state.addTodo({title: null, category: 'notes', dueDate: null})).toBeFalsy()
  })
})

describe('testing toggleCompletionForTodo', () => {
  test('persist() to be called when toggleCompletionForTodo is called', () => {
    const spy = jest.spyOn(state, 'persist')
    state.addTodo({title: 'hello', category: 'notes', dueDate: null, id: 14})
    state.toggleCompletionForTodo(14)
    expect(spy).toHaveBeenCalled()
  })
  
  test('toggleCompletionForTodo should change todo.completed = false to true', () => {
    state.addTodo({title: 'hello', category: 'notes', dueDate: null, id: 15})
    state.toggleCompletionForTodo(15)
    const addedTodo = state.data.todos.filter(todo => todo.id === 15)
    expect(addedTodo[0].completed).toBeTruthy()
  })
  
  test('toggleCompletionForTodo should change todo.completed = true to false', () => {
  })
})