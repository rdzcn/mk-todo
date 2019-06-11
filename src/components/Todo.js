import React from "react"

class Todo extends React.Component {

	state = {
		title: ""
	}

	handleEdit = (title, id) => {
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
    this.setState({ isEditing: false })
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
          <button type="button" onClick={() => this.handleEdit(todo.title, todo.id)}>Edit</button>
          <button type="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
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