import React from "react"
import { colorForDueDate } from "../utils/helpers"

class Todo extends React.Component {

	state = {
		title: ""
	}

	handleEdit = (id, title) => {
    if (this.props.repo.editingID) {
      return;
		} 
		this.setState({
			title: title
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
		this.props.updateApp(this.props.repo.todos)
	}
	
	handleCancel = (id) => {
		this.props.repo.editTodo(id)
		this.props.updateApp(this.props.repo.todos)
	}

	handleDelete = (id) => {
		this.props.repo.deleteTodo(id)
		this.props.updateApp(this.props.repo.todos)
	}

	handleComplete = (id) => {
		this.props.repo.toggleCompletionForTodo(id)
		this.props.updateApp(this.props.repo.todos)
	}

  render() {
		const { editingID } = this.props.repo
		const { todo } = this.props
		const { id, title, completed } = todo
		const dueDate = new Date(todo.dueDate).toLocaleDateString("en-CA")
		const today = new Date()
		const date = new Date(Date.parse(todo.dueDate))
		const dueDateColor = colorForDueDate(today, date)
		
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