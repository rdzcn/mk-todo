import React from "react"

class NewTodo extends React.Component {
  state = {
    title: ""
  }

  handleChange = event => {
    this.setState({ title: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    const title = this.state.title.trim();
    if (title.length !== 0) {
      this.props.addTodo(title)
    }
    this.setState({ title: "" });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <button type="submit">Add a todo</button>
      </form>
    )
  }
}

export default NewTodo;
