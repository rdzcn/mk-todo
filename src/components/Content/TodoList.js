import React from "react"
import Todo from "./Todo"
import EditingTodo from "./EditingTodo"

class TodoList extends React.Component {

	handleSelect = event => {
		
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

	sorterAlphabetic() {

	}

	render() {
		const { repo, completed, filters } = this.props
		const { selectedCategory, data, editingID } = repo
		const todos = filters[0](data.todos)
		const todosByCategory = filters[1](selectedCategory)(todos)
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
				<form>
					<label>
						Sort todos by:
					</label>
					<select onInput={this.handleSelect}>
						<option value="title">Alphabetically</option>
						<option value="createdAt">Creation Date</option>
						<option value="modifiedAt">Modification Date</option>
						<option value="dueDate">Due Date</option>
					</select>
				</form>
				<ul>
					{ 
						todosByCategory.map(todo => {
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
