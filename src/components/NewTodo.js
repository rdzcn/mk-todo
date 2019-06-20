import React from "react"

class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date().toISOString().substr(0, 10) //YYYY-MM-DD necessary format for input[type=date] value
    this.state = {
      title: '',
      date: today
    }  
  }

  handleTitleChange = event => {
    this.setState({ title: event.target.value })
  }

  handleDueDateChange = event => {
    this.setState({ date: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { title, date } = this.state
    let dueDate = new Date(date) //YYYY-MM-DDTHH:MM:SS:MsMsMsZ
    dueDate.setHours(23, 59, 59, 999)
    if (title.length !== 0) {
      this.props.repo.addTodo(title.trim(), dueDate)
    }
    this.setState({ 
      title: ""
    }, this.props.updateApp(this.props.repo.todos))
  }

  render() {
    const { date } = this.state
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
          min={date}
          value={date} 
          onChange={this.handleDueDateChange} 
        />
        <button type="submit">Add a todo</button>
      </form>
    )
  }
}

export default NewTodo;
