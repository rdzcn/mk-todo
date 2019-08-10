import React from 'react'
import Todo from './Todo'
import EditingTodo from './EditingTodo'

const SearchResults = ({ state, router }) => {

  const { search } = router
  const { data } = state

  return (
    <div className="todos">
      <button type="reset" onClick={() => router.resetSearch()}>
          Reset Search
      </button>
      <ul>
        { 
          data.todos.map(todo => {
            const regexSearchText = new RegExp(`\\b${search}`, 'gi')
            const renderTodo = !!todo.title.match(regexSearchText)
            const renderEditingTodo = router.search === todo.id

            if (renderEditingTodo) {
              return <EditingTodo key={todo.id} todo={todo} router={router} state={state} /> 
            } else if (renderTodo) {
              return <Todo key={todo.id} todo={todo} router={router} state={state} />
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
