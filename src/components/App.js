import React from "react"
import State from "./State"
import NewTodo from "./NewTodo"
import TodoList from "./TodoList"
const localStorage = new State()

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: localStorage.todos,
			showCompleted: localStorage._showCompleted
		}
	}

	toggleShowCompleted = () => {
		localStorage._showCompleted = !this.state.showCompleted
	}

	render() {
		return (
			<div>
				<h1>Your Todo App</h1>
				<NewTodo localStorage={localStorage} />
				<TodoList localStorage={localStorage} />
				{ 
					localStorage._showCompleted ?
						(
							<div>
								<button type="button" onClick={this.toggleShowCompleted}>Hide</button>
								<TodoList localStorage={localStorage} completed="true" />
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
