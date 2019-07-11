import React from "react"
import NewTodo from "./Content/NewTodo"
import TodoList from "./Content/TodoList"
import Sidebar from "./Sidebar/Sidebar"

class App extends React.Component {
	
	filterUncompletedTodos = todos => {
		return todos.filter(todo => !todo.completed)
	}

	filterCompletedTodos = todos => {
		return todos.filter(todo => todo.completed)
	}

	filterByCategory = category => {
		return todos => { 
			return todos.filter(todo => todo.category === category) }
	}

	render() {
		const { repo } = this.props
		const { showCompleted } = repo.data

		return (
			<React.Fragment>
				<div className="app-container">
					<header className="main header">
						<h1>Your Todo App #1</h1>
					</header>
					<aside className="main left">
						<Sidebar repo={repo} />
					</aside>
					<div className="main right">
						<NewTodo repo={repo} />
						<TodoList repo={repo} filters={[ this.filterUncompletedTodos, this.filterByCategory ]} />
						<button type="button" onClick={repo.toggleShowCompleted}>
							{showCompleted ? "Hide" : "Show"}
						</button>
						{ 
							showCompleted ? 
								<TodoList repo={repo} completed="true" filters={[ this.filterCompletedTodos, this.filterByCategory ]} /> :
								null 
						}
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default App
