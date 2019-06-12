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
    const { todo, completeTodo, deleteTodo } = this.props

    let listItem
    if (this.props.editingID === todo.id) {
      listItem = (
        <form onSubmit={() => this.handleSave(todo.id)}>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <button type="submit">
            Save
          </button>
					<button type="button" onClick={() => this.handleCancel(todo.id, todo.title)} >
						Cancel
					</button>
        </form>
      )
    } else {
      listItem = (
        <div>
          <input 
            type='checkbox'
            checked={todo.completed}
            onChange={() => completeTodo(todo.id)}
          />
          <span>{todo.title}</span>
          <button type="button" onClick={() => this.handleEdit(todo.id, todo.title)}>
						Edit
					</button>
          <button type="button" onClick={() => deleteTodo(todo.id)}>
						Delete
					</button>
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