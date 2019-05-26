import React from 'react'
import PropTypes from 'prop-types'

class AddEditForm extends React.Component {
  handleChange = event => {
    this.props.titleChange(event)
  }

  handleSubmit = event => {
    event.preventDefault()
    const newTodo = {
      title: this.props.title,
      id: Date.now(),
      completed: false
    }
    this.props.addTodo(newTodo)
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="title" value={this.props.title} onChange={this.handleChange} />
        <button type="submit">Add a todo</button>
      </form>
    )
  }
}

AddEditForm.propTypes = {
  title: PropTypes.string,
  addTodo: PropTypes.func,
  titleChange: PropTypes.func
}

export default AddEditForm