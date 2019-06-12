import React from "react"
import CompletedTodo from "./CompletedTodo"

const CompletedTodoList = ({ todos, deleteTodo, completeTodo }) => {
	function sortModifiedAt(a, b) {
		return b.modifiedAt - a.modifiedAt
	}
	return (
		<ul>
			{todos.sort(sortModifiedAt).map(todo =>
				<CompletedTodo
					key={todo.id}
					todo={todo}
					deleteTodo={deleteTodo}
					completeTodo={completeTodo}
				/>
			)}
		</ul>
	)
}

export default CompletedTodoList
