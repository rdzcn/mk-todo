import React from 'react';
import CompletedTodo from './CompletedTodo';

const CompletedTodoList = ({ todos, deleteTodo }) => {
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
        />
      )}
    </ul>
  )
}

export default CompletedTodoList;