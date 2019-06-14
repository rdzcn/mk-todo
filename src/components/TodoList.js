import React from "react"

class TodoList extends React.Component {
	render() {
		return (
			<div>
				{this.props.completed ? <span>Completed</span> : <span>My Todos</span> } ({this.props.todos.length})
				<ul>
					{this.props.children}
				</ul>
			</div>
		)
	}
} 

export default TodoList