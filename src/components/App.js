import React from "react"
import NewTodo from "./NewTodo"
import TodoList from "./TodoList"
import CompletedTodoList from "./CompletedTodoList"
import { createUID } from '../helpers'

class App extends React.Component {
  constructor(props) {
    super(props)
    const todos = JSON.parse(localStorage.getItem('todos'))
    this.state = {
      title: "",
      isEditing: false,
      showCompleted: false,
      todos: todos || []
    }
  }

  saveToLocal = () => {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  addTodo = title => {
    const todo = {
      title: title,
      completed: false,
      id: createUID(),
      createdAt: Date.now(),
      modifiedAt: Date.now()
    }
    this.setState({
      todos: [...this.state.todos, todo]
    }, this.saveToLocal)
  }

  completeTodo = id => {
    const { todos } = this.state
    todos.map(todo => 
      todo.id === id ? 
        todo.completed = !todo.completed :
        todo
    )
    todos.map(todo => 
      todo.id === id ? 
        todo.modifiedAt = Date.now() :
        todo
    )
    this.setState({ 
      todos
    }, this.saveToLocal)
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
    }, this.saveToLocal)
  }

  deleteTodo = (id) => {
    let { todos } = this.state
    todos = todos.filter(todo =>
      todo.id !== id  
    )
    this.setState({ 
      todos
    }, this.saveToLocal)
  }

  toggleCompleted = () => { 
    this.setState({ 
      showCompleted: !this.state.showCompleted 
    })
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
        {
          this.state.showCompleted ?
            (
              <div>
                <button type="button" onClick={this.toggleCompleted}>Hide</button>
                <CompletedTodoList 
                todos={completedTodos} 
                deleteTodo={this.deleteTodo} 
                />
              </div>
            ) : (
              <div>
                <button type="button" onClick={this.toggleCompleted}>Show</button>
              </div>
            )
        }
      </div>
    )
  }
}

export default App