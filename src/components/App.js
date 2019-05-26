import React from 'react'
import AddEditForm from './AddEditForm'
import Todo from './Todo.js'

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

  handleSubmit = newTodo => {
    this.setState({
      todos: this.state.todos.concat(newTodo),
      title: ''
    })
  }

  checkTodo = key => {
    const { todos } = this.state
    todos[key].completed = !todos[key].completed
    this.setState({ todos })
  }

  render() {
    return (
      <div className="App">
        <AddEditForm handleChange={this.handleChange} title={this.state.title} titleChange={this.handleChange} addTodo={this.handleSubmit} />
        <Todo todos={this.state.todos} checkTodo={this.checkTodo} />
      </div>
    );
  }
}

export default App;
