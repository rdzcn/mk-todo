import React from "react"

const today = new Date().toISOString().substr(0, 10)

class NewTodo extends React.Component {
  state = {
    title: "",
    dueDate: today
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value })
  }

  handleDueDateChange = event => {
    this.setState({ dueDate: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    const { title, dueDate } = this.state;
    if (title.length !== 0) {
      this.props.addTodo(title.trim(), dueDate)
    }
    this.setState({ 
      title: ""
   })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <label>Due date:</label> 
        <input 
          type="date" 
          min={today}
          value={this.state.dueDate} 
          onChange={this.handleDueDateChange} 
        />
        <button type="submit">Add a todo</button>
      </form>
    )
  }
}

export default NewTodo;
