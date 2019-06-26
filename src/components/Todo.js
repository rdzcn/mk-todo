import React from "react"
import DueDate from "./DueDate"
import { colorForDueDate } from "../utils/helpers"

class Todo extends React.Component {

  state = {
    dueDate: null
  }

	handleEdit = (id, title) => {
    if (this.props.repo.editingID) {
      return
    } 

    this.setState({
      dueDate: this.props.todo.dueDate
    }, this.props.repo.editTodo(id, title))
  }

  handleTitleChange = event => {
    this.props.repo.handleTitleChange(event)
  }

  handleDueDateChange = event => {
    this.setState({ dueDate: event.target.value })
  }

  handleSave = (event) => {
		event.preventDefault()
    const id = event.target.name
    const { dueDate } = this.state
    const { createdAt } = this.props.todo
    const { title, saveTodo } = this.props.repo
		saveTodo(title, dueDate, id, createdAt)
	}
	
	handleCancel = (id) => {
    this.props.repo.editTodo(id)
	}

	handleDelete = (id) => {
		this.props.repo.deleteTodo(id)
	}

	handleComplete = (id) => {
		this.props.repo.toggleCompletionForTodo(id)
	}

  render() {
		const { editingID } = this.props.repo
		const { todo } = this.props
		const { id, title, completed, dueDate } = todo
		const today = new Date().toISOString().substr(0, 10)
		const dueDateColor = colorForDueDate(today, dueDate)
		
    let listItem
    if (editingID === id) {
      listItem = (
        <div className="todo editing">
          <form name={id} onSubmit={this.handleSave}>
            <input
              type="text"
              name="title"
              value={this.props.repo.title}
              onChange={this.handleTitleChange}
            />
            <DueDate value={this.state.dueDate} handleDueDateChange={this.handleDueDateChange}/>
            <button type="submit">
              Save
            </button>
            <button type="button" onClick={() => this.handleCancel(id)} >
              Cancel
            </button>
          </form>
        </div>
      )
    } else {
      listItem = (
        <div className="todo unediting">
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
					<br />
					<span style={{color: dueDateColor}}>{dueDate}</span>
        </div>
      )
    }
    
    return (
      <li>
       {listItem}
      </li>
    )
  }
}

export default Todo