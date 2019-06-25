import React from "react"
import ReactDOM from 'react-dom'
import NewTodo from "./NewTodo"
import TodoList from "./TodoList"

import State from "./State"

const App = () => {
		const repo = new State()
		repo.on('stateChanged', () => {
			ReactDOM.render(<App />, document.getElementById('root'))
		})
		const { showCompleted } = repo.data
		
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

export default App
