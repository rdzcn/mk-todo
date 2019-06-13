import React from "react"

class CompletedTodo extends React.Component {
	render() {
		const { id, completed, title } = this.props.todo
		return (
			<li>
				<input 
					type='checkbox'
					checked={completed}
					onChange={() => this.props.completeTodo(id)}
				/>
				<del>{title}</del>
				<button type='button' onClick={() => this.props.deleteTodo(id)}>Delete</button>
			</li>
		)
	}
}

export default CompletedTodo