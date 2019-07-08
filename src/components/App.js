import React from "react"
import NewTodo from "./NewTodo"
import TodoList from "./TodoList"

class App extends React.Component {
	
	filterUncompletedTodos = (todos, category) => {
		const filteredTodos = todos[category].filter(todo => !todo.completed) || []
		return filteredTodos
	}

	filterCompletedTodos = (todos, category) => {
		const filteredTodos = todos[category].filter(todo => todo.completed) || []
		return filteredTodos
	}

	render() {
		const { repo } = this.props
		const { selectedCategory } = repo
		const { showCompleted, todos } = repo.data
		const filterUncompletedTodos = this.filterUncompletedTodos(todos, selectedCategory)
		const filterCompletedTodos = this.filterCompletedTodos(todos, selectedCategory)

		return (
			<div className="app-container">
				<header className="main header">
					<h1>Your Todo App #1</h1>
				</header>
				<aside className="main left">
					<ul>
						{
							Object.keys(todos).map(category => 
								<li key={category} className="main_left-list">
									<button type="button" onClick={() => repo.updateCategory(category)}>
										{category}
									</button>
								</li>
							)
						}
					</ul>
				</aside>
				<div className="main right">
					<NewTodo repo={repo} />
					<TodoList repo={repo} filters={[ filterUncompletedTodos ]} />
					<button type="button" onClick={repo.toggleShowCompleted}>
						{showCompleted ? "Hide" : "Show"}
					</button>
					{ 
						showCompleted ? 
							<TodoList repo={repo} completed="true" filters={[ filterCompletedTodos ]} /> :
							null 
					}
				</div>
			</div>
		)
	}
}

export default App
