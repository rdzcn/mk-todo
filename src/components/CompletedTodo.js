import React from 'react';

const CompletedTodo = ({ todo, deleteTodo }) => {
  return (
    <li>
      <span>{todo.title}</span>
      <button type='button' onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  )
}

export default CompletedTodo;