import React from "react"
import { colorForDueDate } from "../utils/helpers"

class Todo extends React.Component {

  state = {
    title: ""
  }

	handleEdit = id => {
    if (this.props.repo.editingID) {
      return
    } 
    this.setState({
      title: this.props.todo.title
    }, this.props.repo.editTodo(id))
  }

  handleChange = event => {
    this.setState({ title: event.target.value })
  }

  handleSave = (event) => {
		event.preventDefault()
    const id = event.target.name
    const { title } = this.state
		this.props.repo.saveTodo(id, title)
	}
	
	handleCancel = (id) => {
    this.props.repo.editTodo(id)
    this.setState({ title: "" })
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
        <form  name={id} onSubmit={this.handleSave}>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <button type="submit">
            Save
          </button>
					<button type="button" onClick={() => this.handleCancel(id)} >
						Cancel
					</button>
        </form>
      )
    } else {
      listItem = (
        <div>
					<input 
            type='checkbox'
            checked={completed}
            onChange={() => this.handleComplete(id)}
          />
          {completed ? <del>{title}</del> : <span>{title}</span>}
          <button type="button" hidden={completed} onClick={() => this.handleEdit(id)}>
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