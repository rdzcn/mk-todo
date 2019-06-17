import React from "react"
import NewTodo from "./NewTodo"
import TodoList from "./TodoList"

import State from "./State"
let repo = new State()

class App extends React.Component {
	constructor(props) {
		super(props);
		const { todos, _showCompleted } = repo
		this.state = {
			todos: todos,
			showCompleted: _showCompleted
		}
	}

	toggleShowCompleted = () => {
		this.setState({
			showCompleted: !this.state.showCompleted
		}, repo.toggleShowCompleted)
	}

	updateApp = (todos) => {
		this.setState({ todos }, this.updateRepo(todos))
	}

	updateRepo = (todos) => {
		repo.todos = todos
	}

	render() {
		let repo = new State()
		return (
			<div>
				<h1>Your Todo App</h1>
				<NewTodo repo={repo} updateApp={this.updateApp} />
				<TodoList repo={repo} updateApp={this.updateApp} todos={this.state.todos} />
				{ 
					this.state.showCompleted ?
						(
							<div>
								<button type="button" onClick={this.toggleShowCompleted}>Hide</button>
								<TodoList repo={repo} completed="true" updateApp={this.updateApp} todos={this.state.todos} />
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
