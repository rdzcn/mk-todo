import React from 'react'

class App extends React.Component {
  state = {
    title: '',
    todos: []
  }

  handleChange = event => {
    this.setState({
      title: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const newTodo = {
      title: this.state.title,
      id: Date.now(),
      completed: false
    }
    this.setState({
      todos: this.state.todos.concat(newTodo),
      title: ''
    })
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} >
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
          <button type="submit">Add a todo</button>
        </form>
      </div>
    );
  }
}

export default App;
