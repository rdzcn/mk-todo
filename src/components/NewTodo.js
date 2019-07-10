import React from "react"
import DueDate from "./DueDate"

class NewTodo extends React.Component {
    
  state = {
    dueDate: "",
    title: ""
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
    const { selectedCategory, addTodo } = repo
    const { dueDate, title } = this.state
    
    addTodo({title: title, category: selectedCategory, dueDate: dueDate})
    
    this.setState({ 
      title: ""
    })
  }

  render() {
    const { dueDate, title } = this.state
    return (
      <form onSubmit={this.handleSubmit} className="new-todo">
        <input
          type="text"
          value={title}
          onChange={this.handleTitleChange}
        />
        <span>Due date:</span> 
        <DueDate value={dueDate} handleDueDateChange={this.handleDueDateChange}/>
        <button type="submit">Add a todo</button>
      </form>
    )
  }
}

export default NewTodo;
