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

	fetchTodos = todos => {
		let filteredTodos
		if (this.props.completed) {
			filteredTodos = todos.filter(todo => todo.completed) || []
		} else {
			filteredTodos = todos.filter(todo => !todo.completed) || []
		}
		return filteredTodos
	}

	render() {
		const { repo, completed } = this.props
		console.log(repo)
		const { todos } = repo.data
		return (
			<div>
				{completed ? <span>Completed Todos</span> : <span>My Todos</span> } ({this.fetchTodos(todos).length})
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
						this.fetchTodos(todos).sort(this.sortTodos).map(todo => 
							<Todo key={todo.id} todo={todo} repo={repo} />
						)
					}
				</ul>
			</div>
		)
	}
} 

export default TodoList
