import React from "react"
import Todo from "./Todo"
import EditingTodo from "./EditingTodo"

class TodoList extends React.Component {

  handleSelect = event => {
    const sortBy = event.target.value
    this.props.state.updateSortBy(sortBy)
  }

  render() {
    const { state, filters, header, sorters } = this.props
    const { sortBy, data } = state
    const category = state.route
    const todosByCompletion = filters.completion(data.todos)
    const todosByCategory = filters.category(category)(todosByCompletion)
    const sortedTodos = sorters[sortBy](todosByCategory)

    return (
      <div className="todos">
        <h3 className="todos-header">
          { header }
          <span>({todosByCategory.length})</span>
        </h3>
        <form>
          <label>
						Sort todos by:
          </label>
          <select defaultValue={sortBy} onInput={this.handleSelect}>
            <option value="sortByTitle">Alphabetically</option>
            <option value="sortByCreatedAt">Creation Date</option>
            <option value="sortByDueDate">Due Date</option>
            <option value="sortByModifiedAt">Modification Date</option>
          </select>
        </form>
        <ul>
          {
            sortedTodos.map(todo => {
              if (todo.id === state.editingItemID) {
                return <EditingTodo key={todo.id} todo={todo} state={state} />
              } else {
                return <Todo key={todo.id} todo={todo} state={state} />
              }
            })
          }
        </ul>
      </div>
    )
  }
}

export default TodoList
