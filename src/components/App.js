import React from "react"
import NewTodo from "./NewTodo"
import TodoList from "./TodoList"

import State from "./State"

class App extends React.Component {

	state = {
		updater: false
	}

	handleStateUpdate = () => {
		this.setState({ updater: !this.state.updater })
	}

  render() {
		const repo = new State()
		const { showCompleted } = repo.data
		repo.on('stateChanged', this.handleStateUpdate)
		
		return (
			<div>
				<h1>Your Todo App #1</h1>
				<NewTodo repo={repo} />
				<TodoList repo={repo} />
				<button type="button" onClick={repo.toggleShowCompleted}>
					{showCompleted ? "Hide" : "Show"}
				</button>
				{ 
					showCompleted ? 
						<TodoList repo={repo} completed="true" /> :
						null 
				}
			</div>
		)
		}
}


export default App
