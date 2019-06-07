import React from 'react';

class Todo extends React.Component {
  
  state= {
    isEditing: false,
    title: ''
  }

  handleEdit = () => {
    if (this.props.isEditing === true) {
      return;
    } 
    this.setState({
      isEditing: true,
      title: this.props.todo.title
    }, this.props.editTodo)
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
    if (this.props.isEditing && this.state.isEditing) {
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
          {todo.completed ? <del>{todo.title}</del> : <span>{todo.title}</span>}
          <button type="button" onClick={this.handleEdit}>Edit</button>
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

export default Todo;