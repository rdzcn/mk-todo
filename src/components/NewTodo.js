import React from 'react';

const NewTodo = ({ title, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
      />
      <button type="submit">Add a todo</button>
    </form>
  )
}

export default NewTodo;