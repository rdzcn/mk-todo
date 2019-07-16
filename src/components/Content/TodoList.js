import React from "react"
import Todo from "./Todo"
import EditingTodo from "./EditingTodo"

class TodoList extends React.Component {

  render() {
    const { repo, filters, header, router } = this.props
    const { route } = router
    const { data, editingID } = repo
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
          <select onInput={this.handleSort}>
            <option value="title">Alphabetically</option>
            <option value="createdAt">Creation Date</option>
            <option value="dueDate">Due Date</option>
            <option value="modifiedAt">Modification Date</option>
          </select>
        </form>
        <ul>
          { 
            todosByCategory.map(todo => {
              if (editingID === todo.id) {
                return <EditingTodo key={todo.id} todo={todo} repo={repo} />
              } else {
                return <Todo key={todo.id} todo={todo} repo={repo} />
              }
            })
          }
        </ul>
      </div>
    )
  }
}

export default TodoList
