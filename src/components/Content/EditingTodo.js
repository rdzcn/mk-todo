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
    this.props.state.updateEditingTitle(title)
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
    const { state, todo } = this.props
    const { editingTitle } = state
		state.saveTodo({title: editingTitle, category: category, dueDate: dueDate, id: todo.id })
	}

  render() {
		const { editingTitle, data } = this.props.state
		const { todo } = this.props
    const { id } = todo
    const categories = data.categories
    
    return (
      <li>
        <div className="todo editing">
          <div>
            <form name={id} onSubmit={this.handleSave}>
              <div>
                <input
                  type="text"
                  name="title"
                  value={editingTitle}
                  onChange={this.handleTitleChange}
                />
                <DueDate value={this.state.dueDate} handleDueDateChange={this.handleDueDateChange}/>
              </div>
              <div>
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
              </div>
              <div>
                <button type="submit">
                  Save
                </button>
                <button type="reset" onClick={() => this.props.state.cancel()} >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </li>
    )
  }
}

export default EditingTodo