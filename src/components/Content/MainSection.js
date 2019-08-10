import React from 'react'
import NewTodo from './NewTodo'
import TodoList from './TodoList'
import ShowCompletedToggler from './ShowCompletedToggler'

const MainSection = ({ state, router }) => {

  const filterUncompletedTodos = todos => {
    return todos.filter(todo => !todo.completed)
  }

  const filterCompletedTodos = todos => {
    return todos.filter(todo => todo.completed)
  }

  const filterByCategory = category => {
    return todos => { 
      return todos.filter(todo => todo.category === category) 
    }
  }

  const sorters = {
    title: (a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
    modifiedAt: (a, b) => a.modifiedAt - b.modifiedAt,
    createdAt: (a, b) => a.createdAt - b.createdAt,
    dueDate: (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  }

  return (
    <div>
      <NewTodo state={state} router={router} />
      <TodoList state={state} router={router} header="Todos" sorters={sorters} filters={[ filterUncompletedTodos, filterByCategory ]} />
      <ShowCompletedToggler state={state}>
        <TodoList state={state} router={router} header="Completed Todos" sorters={sorters} filters={[ filterCompletedTodos, filterByCategory ]} />
      </ShowCompletedToggler>
    </div>
  )
}


export default MainSection
