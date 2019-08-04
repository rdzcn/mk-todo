import React from 'react'
import Todo from './Todo'
import EditingTodo from './EditingTodo'

const SearchResults = ({ state, router }) => {

  const { search } = window.location

  return (
    <div className="todos">
      <button type="reset" onClick={() => router.resetSearch()}>
          Reset Search
      </button>
      <ul>
        { 
          state.data.todos.map(todo => {
            const regexSearchText = new RegExp(`\\b${search.replace('?', '')}`, 'gi')
            const renderTodo = !!todo.title.match(regexSearchText)
            const renderEditingTodo = !!(state.editingID === todo.id && todo.title.match(regexSearchText))

            if (renderEditingTodo) {
              return <EditingTodo key={todo.id} todo={todo} state={state} /> 
            } else if (renderTodo) {
              return <Todo key={todo.id} todo={todo} state={state} />
            } else {
              return null
            }
          })
        }
      </ul>
    </div>
  )
}


export default SearchResults
