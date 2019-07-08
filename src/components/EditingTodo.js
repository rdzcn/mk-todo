import React from "react"
import DueDate from "./DueDate"

class EditingTodo extends React.Component {

  state = {
    dueDate: this.props.todo.dueDate,
    category: this.props.repo.selectedCategory
  }

	handleTitleChange = event => {
    this.props.repo.handleEditingTitleChange(event)
  }

  handleDueDateChange = event => {
    this.setState({ dueDate: event.target.value })
  }

  handleCategoryChange = event => {
    this.setState({ category: event.target.value })
  }

  handleSave = (event) => {
		event.preventDefault()
    const id = event.target.name
    const { dueDate, category } = this.state
    const { createdAt } = this.props.todo
    const { editingTitle, saveTodo } = this.props.repo
		saveTodo(editingTitle, category, dueDate, id, createdAt)
	}
	
	handleCancel = id => {
    this.props.repo.editTodo(id)
	}

  render() {
		const { data, selectedCategory, editingTitle } = this.props.repo
		const { todo } = this.props
    const { id } = todo
    
    return (
      <li>
        <div className="todo editing">
          <form name={id} onSubmit={this.handleSave}>
            <input
              type="text"
              name="title"
              value={editingTitle}
              onChange={this.handleTitleChange}
            />
            
            <DueDate value={this.state.dueDate} handleDueDateChange={this.handleDueDateChange}/>
            
            <label>
              Move to another category
            </label>
            <select defaultValue={selectedCategory} onInput={this.handleCategoryChange}>
              {
                Object.keys(data.todos).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))
              }
            </select>
            
            <button type="submit">
              Save
            </button>
            
            <button type="button" onClick={() => this.handleCancel(id)} >
              Cancel
            </button>
          </form>
        </div>
      </li>
    )
  }
}

export default EditingTodo