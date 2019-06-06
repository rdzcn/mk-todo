import React from "react";
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";

class App extends React.Component {
  state = {
    title: "",
    isEditing: false,
    todos: []
  };

  addTodo = title => {
    const todo = {
      title: title,
      completed: false,
      id: Date.now()
    };
    this.setState({
      todos: [...this.state.todos, todo]
    })
  };

  completeTodo = id => {
    const { todos } = this.state
    todos.map(todo => 
      todo.id === id ? 
        todo.completed = !todo.completed :
        todo
    )
    this.setState({ todos })
  }

  render() {
    return (
      <div>
        <NewTodo title={this.state.title} addTodo={this.addTodo} />
        <h2>Things to do</h2>
        <TodoList todos={this.state.todos} completeTodo={this.completeTodo} />
      </div>
    );
  }
}

export default App;