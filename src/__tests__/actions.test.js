import State from '../components/State'
import TemporaryStorage from "../components/TemporaryStorage"
import { data } from "../data/temporaryData"

const db = new TemporaryStorage(data)
const state = new State(db)

const todo = {
  completed: true,
  createdAt: Date.now(),
  dueDate: "1970-01-01",
  id: 5,
  modifiedAt: Date.now(),
  title: "hello"
}

const dbAfter = {...db} 
dbAfter.data.todos["1970-01-01"] = [...dbAfter.data.todos["1970-01-01"], todo]

describe('testing addTodo', () => {
  test("persist() to be called when addTodo() is called", () => {
    const spy = jest.spyOn(state, "persist")
    state.addTodo("hello", null, 5)
    expect(spy).toHaveBeenCalled()
  })

  test('null dueDate should add the task without a dueDate', () => {
    state.addTodo("hello", null)
  })
  
  test("addTodo should add a task", () => {
    state.addTodo("hello", "1970-01-01", 5)
    expect(db).toEqual(dbAfter)
  })
  
  test("A new todo must have a title, title cannot be empty", () => {
    expect(state.addTodo(" ", null)).toBeFalsy()
  })

  test()
})