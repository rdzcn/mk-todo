import React from 'react'
import Todo from './Todo'
import EditingTodo from './EditingTodo'

const SearchResults = ({ state }) => {

  const { searchFor, data } = state

  return (
    <div className="todos">
      <button type="reset" onClick={() => state.navigateTo('search')}>
          Reset Search
      </button>
      <button type="reset" onClick={() => state.navigateTo('My Todos')}>
          Close Search
      </button>
      <ul>
        { 
          data.todos.map(todo => {
            const regexSearchText = new RegExp(`\\b${searchFor}`, 'gi')
            const renderTodo = !!todo.title.match(regexSearchText)
            const renderEditingTodo = state.editingItemID === todo.id

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
