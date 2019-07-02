import State from '../components/State'
import TemporaryStorage from "../components/TemporaryStorage"

const db = new TemporaryStorage()
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

test("persist() to be called when addTodo() is called", () => {
  const spy = jest.spyOn(state, "persist")
  state.addTodo("hello", null, 5)
  expect(spy).toHaveBeenCalled()
})

test("after adding a todo, db should be equal to dbAfter", () => {
  state.addTodo("hello", null, 5)
  expect(db).toEqual(dbAfter)
})

test("A new todo must have a title, cannot be null", () => {
  expect(state.addTodo(" ", "2019-07-01")).toBeFalsy()
})