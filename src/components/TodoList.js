import React from "react"

class TodoList extends React.Component {
	render() {
		return (
			<div>
				<h1>My Todos ({this.props.todos.length})</h1>
				<ul>
					{this.props.children}
				</ul>
			</div>
		)
	}
} 

export default TodoList