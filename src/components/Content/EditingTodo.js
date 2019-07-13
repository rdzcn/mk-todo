import React from "react"
import DueDate from "./DueDate"

class EditingTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dueDate: this.props.todo.dueDate,
      category: this.props.todo.category
    }
  }

	handleTitleChange = event => {
    const title = event.target.value
    this.props.repo.updateEditingTitle(title)
  }

  handleDueDateChange = event => {
    const dueDate = event.target.value
    this.setState({ dueDate })
  }

  handleCategoryChange = event => {
    const category = event.target.value
    this.setState({ category })
  }

  handleSave = (event) => {
		event.preventDefault()
    const { dueDate, category } = this.state
    const { repo } = this.props
    const { editingTitle } = repo
		repo.saveTodo({title: editingTitle, category: category, dueDate: dueDate})
	}

  render() {
		const { editingTitle, data } = this.props.repo
		const { todo } = this.props
    const { id } = todo
    const categories = data.categories
    
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
            <select defaultValue={todo.category} onInput={this.handleCategoryChange}>
              {
                categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))
              }
            </select>
            
            <button type="submit">
              Save
            </button>
            
            <button type="button" onClick={() => this.props.repo.cancel()} >
              Cancel
            </button>
          </form>
        </div>
      </li>
    )
  }
}

export default EditingTodo