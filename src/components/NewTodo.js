import React from "react"
import { getStartTime, getEndTime, getTitle } from '../helpers'

class NewTodo extends React.Component {
  
  state = {
    title: this.props.title || "",
    start: ""
  }

  handleChange = event => {
    getStartTime()
    this.setState({ title: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    getEndTime()
    const title = this.state.title.trim();
    if (title.length !== 0) {
      getTitle(title)
      this.props.addTodo(title)
    }
    this.setState({ title: "" });
  }

  handleStart = () => {
    this.setState({ start: Date.now()})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          onKeyDown={this.handleStart}
        />
        <button type="submit">Add a todo</button>
      </form>
    )
  }
}

export default NewTodo;
