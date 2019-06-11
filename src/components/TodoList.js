import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, completeTodo, editTodo, saveTodo, deleteTodo, isEditing }) => {
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
          isEditing={isEditing} 
        />
      )}
    </ul>
  )
}

export default TodoList;