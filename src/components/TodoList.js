import React from "react"
import Todo from "./Todo"

class TodoList extends React.Component {

	state = {
		sorter: ""
	}

	handleSelect = event => {
		console.log(event.target.options.selectedIndex)
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
		const { repo, completed, selectedDate } = this.props
		const todos = repo.data.todos[selectedDate] || []
		return (
			<div className="todos">
				<h2>{selectedDate}</h2>
				{completed ? 
					<span className="todos-header">Completed Todos ({this.fetchTodos(todos).length})</span> : 
						<span className="todos-header">My Todos ({this.fetchTodos(todos).length})</span> 
				} 
				<br />
				
				<label>Sort todos by:
					<select onInput={this.handleSelect}>
						<option value="title">Alphabetically</option>
						<option value="createdAt">Creation Date</option>
						<option value="modifiedAt">Modification Date</option>
						<option value="dueDate">Due Date</option>
					</select>
				</label>
				<ul>
					{ 
						this.fetchTodos(todos).sort(this.sortTodos).map(todo => 
							<Todo key={todo.id} todo={todo} repo={this.props.repo} />
						)
					}
				</ul>
			</div>
		)
	}
} 

export default TodoList
