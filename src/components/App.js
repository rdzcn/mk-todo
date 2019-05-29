import React from "react";

class App extends React.Component {
  state = {
    title: "",
    todos: [],
    isEditing: false,
    indexEditing: ""
  };

  handleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const id = this.state.todos.length + 1;
    const todo = {
      title: this.state.title,
      completed: false,
      id: id,
      editable: false
    };
    this.setState({
      todos: this.state.todos.concat(todo),
      title: ""
    });
  };

  handleCheckbox = event => {
    const { todos } = this.state;
    todos[event.target.name].completed = !todos[event.target.name].completed;
    this.setState({ todos });
  };

  handleDelete = event => {
    const { todos } = this.state;
    todos.splice(event.target.name, 1);
    this.setState({ todos });
  };

  handleEdit = event => {
    const { todos } = this.state;
    todos[event.target.name].editable = true;
    this.setState({
      isEditing: !this.state.isEditing,
      indexEditing: event.target.name,
      todos
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <button type="submit">Add a todo</button>
        </form>
        <h2>Things to do</h2>
        <ul>
          {this.state.todos.map((item, index) => {
            return item.editable ? (
              <li>
                <input type="text" name={index} value={item.title} />
                <button type="button" name={index}>
                  Save
                </button>
              </li>
            ) : (
              <li key={item.id}>
                {item.title}
                <input
                  type="checkbox"
                  name={index}
                  checked={item.completed}
                  onClick={this.handleCheckbox}
                />
                <button name={index} type="button" onClick={this.handleDelete}>
                  Delete
                </button>
                <button name={index} type="button" onClick={this.handleEdit}>
                  Edit
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
