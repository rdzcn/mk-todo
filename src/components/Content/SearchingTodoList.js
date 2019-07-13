import React from 'react'
import Todo from './Todo'

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
              if (todo.title.match(regexSearchText)) {
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
