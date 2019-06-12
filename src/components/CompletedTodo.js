import React from "react"

const CompletedTodo = ({ todo, deleteTodo, completeTodo }) => {
	return (
		<li>
			<input 
				type='checkbox'
				checked={todo.completed}
				onChange={() => completeTodo(todo.id)}
			/>
			<del>{todo.title}</del>
			<button type='button' onClick={() => deleteTodo(todo.id)}>Delete</button>
		</li>
	)
}

export default CompletedTodo