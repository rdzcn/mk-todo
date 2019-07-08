import React from "react"
import Todo from "./Todo"
import EditingTodo from "./EditingTodo"

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

	render() {
		const { repo, completed, filters } = this.props
		const { selectedCategory } = repo
		const { editingID } = repo
		return (
			<div className="todos">
				{
					completed ? (
						<span className="todos-header">
							Completed Todos ({filters.length})
						</span>  
					 ) : (
						<div>
							<h2>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h2>
							<span className="todos-header">My Todos ({filters[0].length})</span>
						</div>
					 )
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
						filters[0].sort(this.sortTodos).map(todo => {
							if (editingID === todo.id) {
								return <EditingTodo key={todo.id} todo={todo} repo={repo} />
							} else {
								return <Todo key={todo.id} todo={todo} repo={repo} />
							}
						})
					}
				</ul>
			</div>
		)
	}
} 

export default TodoList
