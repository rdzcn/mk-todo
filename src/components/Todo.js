import React from "react"

class Todo extends React.Component {

	state = {
		title: ""
	}

	handleEdit = (id, title) => {
    if (this.props.editingID !== "") {
      return;
		} 
		this.setState({
			title: title
		}, this.props.editTodo(id)) 
  }

  handleChange = event => {
    this.setState({ title: event.target.value })
  }

  handleSave = (id) => {
    const { title } = this.state
    this.props.saveTodo(id, title)
	}
	
	handleCancel = (id, title) => {
		this.props.saveTodo(id, title)
	}

  render() {
		const { todo, completeTodo, deleteTodo, editingID } = this.props
		const { id, title, completed, dueDate } = todo

    let listItem
    if (editingID === id) {
      listItem = (
        <form onSubmit={() => this.handleSave(id)}>
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
            onChange={() => completeTodo(id)}
          />
          <span>{title}</span>
          <button type="button" onClick={() => this.handleEdit(id, title)}>
						Edit
					</button>
          <button type="button" onClick={() => deleteTodo(id)}>
						Delete
					</button>
					<br />
					<span>{dueDate}</span>
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