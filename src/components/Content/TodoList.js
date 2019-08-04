import React from "react"
import Todo from "./Todo"
import EditingTodo from "./EditingTodo"

class TodoList extends React.Component {

  handleSelect = event => {
    const sortBy = event.target.value
    this.props.router.updatePathSearch(sortBy)
  }

  render() {
    const { state, filters, header, router, sorters } = this.props
    const sortBy = window.location.search.replace('?', '') || 'createdAt'
    const sorterMethod = sorters[sortBy]
    const { route } = router
    const { data, editingID } = state
    const todos = filters[0](data.todos)
    const todosByCategory = filters[1](route)(todos)

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
            <option value="title">Alphabetically</option>
            <option value="createdAt">Creation Date</option>
            <option value="dueDate">Due Date</option>
            <option value="modifiedAt">Modification Date</option>
          </select>
        </form>
        <ul>
          {
            todosByCategory.sort(sorterMethod).map(todo => {
              if (editingID === todo.id) {
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
