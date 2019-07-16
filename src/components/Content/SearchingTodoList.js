import React from 'react'
import Todo from './Todo'
import EditingTodo from './EditingTodo'

const SearchingTodoList = ({ repo, router }) => {

  const { search } = window.location

  return (
    <div className="todos">
      <button type="reset" onClick={() => router.resetSearch()}>
          Reset Search
      </button>
      <ul>
        { 
          repo.data.todos.map(todo => {
            const regexSearchText = new RegExp(`${search.replace('?', '')}`, 'gi')
            const renderTodo = !!todo.title.match(regexSearchText)
            const renderEditingTodo = !!(repo.editingID === todo.id && todo.title.match(regexSearchText))

            if (renderEditingTodo) {
              return <EditingTodo key={todo.id} todo={todo} repo={repo} /> 
            } else if (renderTodo) {
              return <Todo key={todo.id} todo={todo} repo={repo} />
            } else {
              return null
            }
          })
        }
      </ul>
    </div>
  )
}


export default SearchingTodoList
