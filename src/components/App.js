import React from "react"
import NewTodo from "./NewTodo"
import TodoList from "./TodoList"
import CompletedTodoList from "./CompletedTodoList"

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

  editTodo = () => {
    this.setState({ isEditing: true })
  }

  saveTodo = (id, text) => {
    const { todos } = this.state
    todos.map(todo => 
      todo.id === id ?
        todo.title = text :
        todo
    )
    this.setState({ 
      todos,
      isEditing: false 
    })
  }

  deleteTodo = (id) => {
    let { todos } = this.state
    todos = todos.filter(todo =>
      todo.id !== id  
    )
    this.setState({ todos })
  }

  render() {
    const todos = this.state.todos.filter(todo => !todo.completed)
    const completedTodos = this.state.todos.filter(todo => todo.completed)
    return (
      <div>
        <NewTodo 
          title={this.state.title} 
          addTodo={this.addTodo}
        />
        <h1>My Todos ({todos.length})</h1>
        <TodoList 
          todos={todos} 
          completeTodo={this.completeTodo}
          editTodo={this.editTodo} 
          saveTodo={this.saveTodo}
          deleteTodo={this.deleteTodo} 
          isEditing={this.state.isEditing} 
          title={this.state.title} 
        />
        <h2>Completed ({completedTodos.length})</h2>
        <CompletedTodoList 
          todos={completedTodos} 
          deleteTodo={this.deleteTodo} 
        />
      </div>
    );
  }
}

export default App;