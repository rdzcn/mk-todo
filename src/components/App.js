import React from 'react'
import AddEditForm from './AddEditForm';

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

  render() {
    return (
      <div className="App">
        <AddEditForm handleChange={this.handleChange} title={this.state.title} titleChange={this.handleChange} addTodo={this.handleSubmit} />
      </div>
    );
  }
}

export default App;
