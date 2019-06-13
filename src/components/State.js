import React from "react"
import NewTodo from "./NewTodo"
import TodoList from "./TodoList"
import CompletedTodoList from "./CompletedTodoList"
import Todo from "./Todo"
import CompletedTodo from "./CompletedTodo"
import uuid from 'uuid/v4'

class State extends React.Component  {
	constructor(props) {
		super(props)
		const todos = JSON.parse(localStorage.getItem("todos"))
		this.state = {
			editingID: "",
			showCompleted: false,
			todos: todos || []
		}
	}

	saveToLocal = () => {
  	localStorage.setItem("todos", JSON.stringify(this.state.todos))
  }

  addTodo = (title, dueDate) => {
		const todo = {
  		title: title,
  		completed: false,
  		id: uuid(),
  		createdAt: Date.now(),
			modifiedAt: Date.now(),
			dueDate: dueDate
  	}
  	this.setState({
  		todos: [...this.state.todos, todo]
  	}, this.saveToLocal)
  }
  
  completeTodo = id => {
  	const { todos } = this.state
  	todos.map(todo => {
  		if (todo.id === id) {
  			todo.completed = !todo.completed
  			todo.modifiedAt = Date.now()
  			return todo
  		} else {
  			return todo
  		}
  	})
  	this.setState({
  		todos
  	}, this.saveToLocal)
  }

  editTodo = (id) => {
  	this.setState({ editingID: id })
  }

  saveTodo = (id, title) => {
  	const { todos } = this.state
  	todos.map(todo =>
  		todo.id === id ?
  			todo.title = title :
  			todo
  	)
  	this.setState({
  		todos,
  		editingID: ""
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
	
	sortModifiedAt = (a, b) => {
		return b.modifiedAt - a.modifiedAt
	}

	render() {
		const todos = this.state.todos.filter(todo => !todo.completed)
  	const completedTodos = this.state.todos.filter(todo => todo.completed)
		return (
			<div>
				<NewTodo addTodo={this.addTodo}/>
				<TodoList todos={todos}>
					{todos.map(todo => 
						<Todo 
							key={todo.id} 
							todo={todo} 
							completeTodo={this.completeTodo} 
							editTodo={this.editTodo}
							saveTodo={this.saveTodo}
							deleteTodo={this.deleteTodo} 
							editingID={this.state.editingID} 
						/>
					)}
				</TodoList>
				{
					this.state.showCompleted ?
						(
							<div>
								<button type="button" onClick={this.toggleCompleted}>Hide</button>
								<TodoList todos={completedTodos}>
									{completedTodos.sort(this.sortModifiedAt).map(todo =>
										<Todo
											key={todo.id}
											todo={todo}
											deleteTodo={this.deleteTodo}
											completeTodo={this.completeTodo}
										/>
									)}
								</TodoList>
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

export default State

