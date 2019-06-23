import React from "react"

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date().toISOString().substr(0, 10) //YYYY-MM-DD necessary format for input[type=date] value
    this.state = {
      dueDate: today,
      title: ""
    }  
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value})
  }

  handleDueDateChange = event => {
    this.setState({ dueDate: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { repo } = this.props
    const { title, dueDate } = this.state
    repo.addTodo(title, dueDate)
    this.setState({ title: "" })

  }

  render() {
    const { dueDate, title } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={this.handleTitleChange}
        />
        <span>Due date:</span> 
        <input 
          type="date" 
          min={dueDate}
          value={dueDate} 
          onChange={this.handleDueDateChange} 
        />
        <button type="submit">Add a todo</button>
      </form>
    )
  }
}

export default NewTodo;
