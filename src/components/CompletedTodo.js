import React from "react"

const CompletedTodo = ({ todo, deleteTodo }) => {
	return (
		<li>
			<del>{todo.title}</del>
			<button type='button' onClick={() => deleteTodo(todo.id)}>Delete</button>
		</li>
	)
}

export default CompletedTodo