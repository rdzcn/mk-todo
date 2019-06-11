import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, completeTodo, editTodo, saveTodo, deleteTodo, isEditing, title }) => {
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
          title={title}
        />
      )}
    </ul>
  )
}

export default TodoList;