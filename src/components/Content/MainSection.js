import React from 'react'
import NewTodo from './NewTodo'
import TodoList from './TodoList'
import ShowCompletedToggler from './ShowCompletedToggler'

const MainSection = ({ state }) => {

  const filterUncompletedTodos = todos => todos.filter(todo => !todo.completed)
  const filterCompletedTodos = todos => todos.filter(todo => todo.completed)
  const filterByCategory = category => todos => todos.filter(todo => todo.category === category)

  const sorters = {
    sortByTitle: todos => todos.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())),
    sortByModifiedAt: todos => todos.sort((a, b) => a.modifiedAt - b.modifiedAt),
    sortByCreatedAt: todos => todos.sort((a, b) => a.createdAt - b.createdAt),
    sortByDueDate: todos => todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
  }

  return (
    <div>
      <NewTodo state={state} />
      <TodoList state={state} header="Todos" sorters={sorters} filters={{category: filterByCategory, completion: filterUncompletedTodos }} />
      <ShowCompletedToggler state={state}>
        <TodoList state={state} header="Completed Todos" sorters={sorters} filters={{category: filterByCategory, completion: filterCompletedTodos }} />
      </ShowCompletedToggler>
    </div>
  )
}


export default MainSection
