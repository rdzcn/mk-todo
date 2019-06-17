import React from "react"

class Todo extends React.Component {

	state = {
		title: ""
	}

	handleEdit = (id, title) => {
    if (this.props.localStorage.editingID !== "") {
      return;
		} 
		this.setState({
			title: title
		}, this.props.localStorage.editTodo(id)) 
  }

  handleChange = event => {
    this.setState({ title: event.target.value })
  }

  handleSave = (event) => {
		event.preventDefault()
		const id = event.target.name
		const { title } = this.state
    this.props.localStorage.saveTodo(id, title)
	}
	
	handleCancel = (id, title) => {
		this.props.localStorage.saveTodo(id, title)
	}

	handleDelete = (id) => {
		this.props.localStorage.deleteTodo(id)
	}

	handleComplete = (id) => {
		this.props.localStorage.completeTodo(id)
	}

	decideDueDateColor = date => {
		const dueDate = new Date(date)
		dueDate.setHours(23, 59, 59, 999)
		const now = new Date()
		if (dueDate.valueOf() - now.valueOf() < 24 * 60 * 60 * 1000 && dueDate.valueOf() > now.valueOf()) {
			return "green"
		} else if (dueDate.valueOf() > now.valueOf()) {
			return "blue"
		} else { 
			return "red"
		}
	}

  render() {
		const { editingID } = this.props.localStorage
		const { todo } = this.props
		const { id, title, completed, dueDate } = todo
		const dueDateColor = this.decideDueDateColor(dueDate)

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
					<button type="button" onClick={() => this.handleCancel(id, title)} >
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
					<span className={dueDateColor}>{dueDate}</span>
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