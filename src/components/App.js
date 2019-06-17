import React from "react"
import NewTodo from "./NewTodo"
import TodoList from "./TodoList"

import State from "./State"
const localStorage = new State()

class App extends React.Component {
	constructor(props) {
		super(props);
		const { todos, _showCompleted } = localStorage
		this.state = {
			todos: todos,
			showCompleted: _showCompleted
		}
	}

	toggleShowCompleted = () => {
		this.setState({
			showCompleted: !this.state.showCompleted
		}, localStorage.toggleShowCompleted)
		
	}

	updateApp = (todos) => {
		this.setState({ todos })
	}

	render() {
		return (
			<div>
				<h1>Your Todo App</h1>
				<NewTodo localStorage={localStorage} updateApp={this.updateApp} />
				<TodoList localStorage={localStorage} updateApp={this.updateApp} todos={this.state.todos} />
				{ 
					this.state.showCompleted ?
						(
							<div>
								<button type="button" onClick={this.toggleShowCompleted}>Hide</button>
								<TodoList localStorage={localStorage} completed="true" updateApp={this.updateApp} todos={this.state.todos} />
							</div>
						) : (
							<div>
								<button type="button" onClick={this.toggleShowCompleted}>Show</button>
							</div>
						)
				}
			</div>
		)
	}
}

export default App
