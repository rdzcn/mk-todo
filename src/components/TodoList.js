import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, completeTodo }) => {
  return (
    <ul>
      {todos.map(todo => 
        <Todo key={todo.id} todo={todo} handleCheckbox={completeTodo} />
      )}
    </ul>
  )
}

export default TodoList;