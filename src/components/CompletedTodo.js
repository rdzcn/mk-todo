import React from "react"

class CompletedTodo extends React.Component {
	render() {
		return (
			<li>
				<input 
					type='checkbox'
					checked={this.props.todo.completed}
					onChange={() => this.props.completeTodo(this.props.todo.id)}
				/>
				<del>{this.props.todo.title}</del>
				<button type='button' onClick={() => this.props.deleteTodo(this.props.todo.id)}>Delete</button>
			</li>
		)
	}
}

export default CompletedTodo