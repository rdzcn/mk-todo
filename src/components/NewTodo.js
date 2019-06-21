import React from "react"

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date().toISOString().substr(0, 10) //YYYY-MM-DD necessary format for input[type=date] value
    this.state = {
      title: '',
      dueDate: today
    }  
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value })
  }

  handleDueDateChange = event => {
    this.setState({ dueDate: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { repo } = this.props
    const { dueDate } = this.state
    const title = this.state.title.trim()
    if (title.length !== 0) {
      repo.addTodo(title, dueDate)
    }
    this.setState({ 
      title: ""
    })
  }

  render() {
    const { title, dueDate } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={this.handleTitleChange}
        />
        <label>Due date:</label> 
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
