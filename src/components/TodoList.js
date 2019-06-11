import React from "react"
import Todo from "./Todo"

const TodoList = ({ todos, completeTodo, editTodo, saveTodo, deleteTodo, editingID }) => {
	return (
		<ul>
			{todos.map(todo => 
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
	)
}

export default TodoList