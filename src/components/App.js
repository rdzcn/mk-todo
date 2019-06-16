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
		this.setState({
			showCompleted: !this.state.showCompleted
		}, localStorage.toggleShowCompleted)
		
	}

	render() {
		return (
			<div>
				<h1>Your Todo App</h1>
				<NewTodo localStorage={localStorage} />
				<TodoList localStorage={localStorage} />
				{ 
					this.state.showCompleted ?
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
