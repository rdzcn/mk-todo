import React from "react"
import NewTodo from "./NewTodo"
import TodoList from "./TodoList"

import State from "./State"

const App = () => {
	const repo = new State()
	return (
		<div>
			<h1>Your Todo App</h1>
			<NewTodo repo={repo} />
			<TodoList repo={repo} />
			{ 
				repo.showCompleted ?
					(
						<div>
							<button type="button" onClick={repo.toggleShowCompleted}>Hide</button>
							<TodoList repo={repo} completed="true" />
						</div>
					) : (
						<div>
							<button type="button" onClick={repo.toggleShowCompleted}>Show</button>
						</div>
					)
			}
		</div>
	)
}

export default App
