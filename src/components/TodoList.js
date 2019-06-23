import React from "react"
import Todo from "./Todo"
import List from "./List"

class TodoList extends React.Component {
	
	state = {
		sorter: ""
	}

	handleSelect = event => {
		this.setState({ sorter: event.target.value })
	}

	sortTodos = (a, b) => {
		const { sorter } = this.state
		switch (sorter) {
			case "a-z":
			 return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
			case "modifiedAt":
				return a.modifiedAt - b.modifiedAt
			case "createdAt":
				return a.createdAt - b.createdAt
			case "dueDate":
				return new Date(a.dueDate) - new Date(b.dueDate)
			default:
				return b.createdAt - a.createdAt
		}
	}

	fetchTodos = () => {
		let todos
		if (this.props.completed) {
			todos = this.props.repo.data.todos.filter(todo => todo.completed) || []
		} else {
			todos = this.props.repo.data.todos.filter(todo => !todo.completed) || []
		}
		return todos
	}

	render() {
		const { repo } = this.props
		const { completed } = repo
		return (
			<div>
				{completed ? <span>Completed Todos</span> : <span>My Todos</span> } ({this.fetchTodos().length})
				<br />
		
				<select onChange={this.handleSelect}>
					<option value="">Sort todos by</option>
					<option value="a-z">Alphabetically</option>
					<option value="createdAt">Creation Date</option>
					<option value="modifiedAt">Modification Date</option>
					<option value="dueDate">Due Date</option>
				</select>
		
				<ul>
					{ 
						this.fetchTodos().sort(this.sortTodos).map(todo => 
							<Todo key={todo.id} todo={todo} repo={repo} />
						)	
					}
				</ul>
			</div>
		)
	}
} 

export default TodoList
