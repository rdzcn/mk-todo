import React from "react"
import NewTodo from "./NewTodo"
import TodoList from "./TodoList"

const App = ({ repo }) => {
	
	const { showCompleted } = repo.data
	const { selectedCategory } = repo

	return (
		<div className="app-container">
			<header className="main header">
				<h1>Your Todo App #1</h1>
				<NewTodo repo={repo} />
			</header>
			<aside className="main left">
				<ul>
					{
						Object.keys(repo.data.todos).map(category => 
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
				<TodoList repo={repo} category={selectedCategory} />
				<button type="button" onClick={repo.toggleShowCompleted}>
					{showCompleted ? "Hide" : "Show"}
				</button>
				{ 
					showCompleted ? 
						<TodoList repo={repo} completed="true" category={selectedCategory} /> :
						null 
				}
			</div>
		</div>
	)
}

export default App
