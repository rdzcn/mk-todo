import React from 'react'
import Todo from './Todo'
import EditingTodo from './EditingTodo'

class SearchingTodoList extends React.Component {

  render() {
    const { repo } = this.props

    return (
      <div className="todos">
        <button type="button" onClick={() => repo.cancel()}>
          Reset Search
        </button>
        <ul>
          { 
            repo.data.todos.map(todo => {
              const regexSearchText = new RegExp(`${repo.searchText}`)
              const renderTodo = !!(repo.editingID === todo.id || todo.title.match(regexSearchText))
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
}

export default SearchingTodoList
