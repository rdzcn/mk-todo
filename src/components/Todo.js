import React from 'react';

class Todo extends React.Component {
  
  state= {
    isEditing: false
  }

  handleEdit = () => {
    if (this.props.isEditing === true) {
      return;
    } 
    this.setState({
      isEditing: true
    }, this.props.handleEdit())
  }

  render() {
    const { todo, handleCheckbox } = this.props

    //let domEntry
    //if (this.state.isEditing) {
    //  domEntry = (
    //    <form onSubmit={this.handleSubmit}>
    //      <input
    //        type="text"
    //        name="title"
    //        value={todo.title}
    //        onChange={this.handleChange}
    //      />
    //      <button type="submit">
    //        Save
    //      </button>
    //    </form>
    //  )
    //} else {
    //  domEntry = (
    //    <div>
    //      <input
    //        type="checkbox"
    //        checked={todo.completed}
    //        onChange={() => handleCheckbox(todo.id)}
    //      />
    //      {todo.completed ? <del>{todo.title}</del> : <span>{todo.title}</span>}
    //      <button type="button" onClick={this.handleEdit}>
    //        Edit
    //      </button>
    //      <button type="button" onClick={() => handleDelete(todo.id)}>
    //        Delete
    //      </button>
    //    </div>
    //  )
    //}
    let listItem
    listItem = (
      <div>
        <input 
          type='checkbox'
          checked={todo.completed}
          onChange={() => handleCheckbox(todo.id)}
        />
        {todo.completed ? <del>{todo.title}</del> : <span>{todo.title}</span>}
        <button type="button" onClick={() => console.log("edit clicked")}>Edit</button>
        <button type="button" onClick={() => console.log("delete clicked")}>Delete</button>
      </div>
    )
    return (
      <li>
       {listItem}
      </li>
    )
  }
}

export default Todo;