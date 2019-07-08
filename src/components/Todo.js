import React from "react"
import { colorForDueDate } from "../utils/helpers"

class Todo extends React.Component {

	handleEdit = (id, title) => {
    if (this.props.repo.editingID) {
      return
    } 
    this.props.repo.editTodo(id, title)
  }
	
	handleDelete = (id) => {
		this.props.repo.deleteTodo(id)
	}

	handleComplete = (id) => {
		this.props.repo.toggleCompletionForTodo(id)
	}

  render() {
		const { todo } = this.props
    const { id, title, completed, dueDate } = todo
    
    const today = new Date().toISOString().substr(0, 10)
		const dueDateColor = colorForDueDate(today, dueDate)
    
    return (
      <li>
        <div className="todo unediting">
					<div className="todo-actions">
            <input 
              type='checkbox'
              checked={completed}
              onChange={() => this.handleComplete(id)}
            />
            {completed ? <del>{title}</del> : <span>{title}</span>}
            <button type="button" hidden={completed} onClick={() => this.handleEdit(id, title)}>
              Edit
            </button>
            <button type="button" onClick={() => this.handleDelete(id)}>
              Delete
            </button>
          </div>
					<span style={{color: dueDateColor}}>{dueDate}</span>
        </div>
      </li>
    )
  }
}

export default Todo