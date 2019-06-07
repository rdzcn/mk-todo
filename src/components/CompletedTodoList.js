import React from 'react';
import CompletedTodo from './CompletedTodo';

const CompletedTodoList = ({ todos, deleteTodo }) => {
  return (
    <ul>
      {todos.map(todo => 
        <CompletedTodo 
          key={todo.id} 
          todo={todo} 
          deleteTodo={deleteTodo} 
        />
      )}
    </ul>
  )
}

export default CompletedTodoList;