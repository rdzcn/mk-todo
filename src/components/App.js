import React from "react";

class App extends React.Component {
  state = {
    title: "",
    todos: [],
    isEditing: false,
    indexEditing: "",
    editTitle: "",
    id: ''
  };

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    const id = JSON.parse(localStorage.getItem('id'));
    if (todos) {
      this.setState({ 
        todos,
        id: id || 0 
      });
    }
    window.addEventListener("beforeunload", this.saveToLocal.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.saveToLocal.bind(this));
    this.saveToLocal();
  }

  saveToLocal() {
    const { todos, id } = this.state;
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("id", JSON.stringify(id));
  };

  handleChange = event => {
    this.setState({
      title: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, id, todos } = this.state
    if (title) {
    const todo = {
      title,
      id: id + 1,
      completed: false,
      editable: false
    };
    this.setState(
      {
        todos: todos.concat(todo),
        title: "",
        id: id + 1
      },
      this.saveToLocal
    );
    }
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
    if (!this.state.isEditing) {
      todos[event.target.name].editable = !todos[event.target.name].editable;
      this.setState({
        isEditing: true,
        indexEditing: event.target.name,
        editTitle: todos[event.target.name].title,
        todos
      });
    }
  };

  handleSave = event => {
    event.preventDefault();
    const { todos } = this.state;
    todos[event.target.name].title = this.state.editTitle;
    todos[event.target.name].editable = !todos[event.target.name].editable;
    this.setState({
      todos,
      isEditing: false
    });
  };

  handleEditChange = event => {
    this.setState({
      editTitle: event.target.value
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
            return item.editable && this.state.isEditing ? (
              <li>
                <form name={index} onSubmit={this.handleSave}>
                  <input
                    type="text"
                    name={index}
                    value={this.state.editTitle}
                    onChange={this.handleEditChange}
                  />
                  <button type="submit">
                    Save
                  </button>
                </form>
              </li>
            ) : (
              <li key={item.id}>
                {item.completed ? <del>{item.title}</del> : <span>{item.title}</span>}
                <input
                  type="checkbox"
                  name={index}
                  checked={item.completed}
                  onChange={this.handleCheckbox}
                />
                <button type="button" name={index} onClick={this.handleDelete}>
                  Delete
                </button>
                <button type="button" name={index} onClick={this.handleEdit}>
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
