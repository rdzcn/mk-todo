import React from 'react'
import PropTypes from 'prop-types'

class Todo extends React.Component {
  completeTodo = event => {
    this.props.checkTodo(event.target.name)
  }
  
  render() {
    const { todos } = this.props
    return (
      <div className="todos">
        <h2>Tasks to do</h2>
        <ul>
          {Object.keys(todos).map(key =>
            <li key={todos[key].id}>
              {todos[key].title}
              <input type="checkbox" name={key} checked={todos[key].completed} onChange={this.completeTodo} />
            </li> 
          )}
        </ul>
      </div>
    )
  }
}

Todo.propTypes = {

}

export default Todo