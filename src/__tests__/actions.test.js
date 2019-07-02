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

const dbAfter = db.data.todos["1970-01-01"].concat(todo)

test("persist() to be called when addTodo() is called", () => {
  const spy = jest.spyOn(state, "persist")
  state.addTodo("hello", null, 5)
  expect(spy).toHaveBeenCalled()
})