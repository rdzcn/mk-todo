import React from "react"
import Todo from "./Todo"

class TodoList extends React.Component {
	
	state = {
		sorter: ""
	}

	handleSelect = event => {
		this.setState({ sorter: event.target.value })
	}

	sortUncompleted = (a, b) => {
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

	sortCompleted = (a, b) => b.modifiedAt - a.modifiedAt
	
	render() {
		const { todos, completeTodo, editTodo, saveTodo, deleteTodo, editingID } = this.props
		
		return (
			<div>
				{this.props.completed ? <span>Completed</span> : <span>My Todos</span> } ({this.props.todos.length})
				<br />
				<select onChange={this.handleSelect}>
					<option value="">Sort todos by</option>
					<option value="a-z">Alphabetically</option>
					<option value="createdAt">Creation Date</option>
					<option value="modifiedAt">Modification Date</option>
					<option value="dueDate">Due Date</option>
				</select>
				<ul>
					{todos.sort(this.sortUncompleted).map(todo => 
						<Todo 
							key={todo.id} 
							todo={todo}
							completeTodo={completeTodo}
							editTodo={editTodo}
							saveTodo={saveTodo}
							deleteTodo={deleteTodo}
							editingID={editingID} 
						/>
					)}
				</ul>
			</div>
		)
	}
} 

export default TodoList
