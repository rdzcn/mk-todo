import React from 'react'
import { colorForDueDate } from '../../utils/helpers'

class Todo extends React.Component {

  render() {
    const { todo, router, state } = this.props
    const { id, title, completed, dueDate } = todo
    const dueDateColor = colorForDueDate(dueDate)
    
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
            <button type="button" hidden={completed} onClick={() => router.updatePathSearch(id)}>
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