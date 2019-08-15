import React from 'react'
import { colorForDueDate } from '../../utils/helpers'

class Todo extends React.Component {

  render() {
    const { todo, state } = this.props
    const { id, title, completed, dueDate } = todo
    
    const today = new Date().toISOString().substr(0, 10)
    const dueDateColor = colorForDueDate(today, dueDate)
    
    return (
      <li>
        <div className="todo unediting">
          <div className="todo-actions">
            <input 
              type='checkbox'
              checked={completed}
              onChange={() => state.toggleCompletionForTodo(id)}
            />
            {completed ? <del>{title}</del> : <span>{title}</span>}
            <button type="button" hidden={completed} onClick={() => state.updateTodo(todo)}>
              Edit
            </button>
            <button type="button" onClick={() => state.deleteTodo(id)}>
              Delete
            </button>
          </div>
          {dueDateColor && <span style={{color: dueDateColor}}>{dueDate}</span>}
        </div>
      </li>
    )
  }
}

export default Todo