import React from "react"
import DueDate from "./DueDate"

class EditingTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newDueDate: props.todo.dueDate,
      newCategoryTitle: this.props.todo.category
    }
  }

	handleTodoTitleChange = event => {
    const title = event.target.value
    const { state } = this.props
    state.updateTodoTitle(title)
  }

  handleDueDateChange = event => {
    const newDueDate = event.target.value
    this.setState({ newDueDate })
  }

  handleTodoCategoryChange = event => {
    const newCategoryTitle = event.target.value
    this.setState({ newCategoryTitle })
  }

  handleSave = event => {
		event.preventDefault()
    const { newDueDate, newCategoryTitle } = this.state
    const { state, todo } = this.props
    const { editingTitle } = state
    const params = {
      id: todo.id,
      title: editingTitle,
      newDueDate,
      newCategoryTitle
    }
    state.editTodo(params)
	}

  render() {
    const { todo, state } = this.props
		const { editingTodoTitle, data } = state
    const { categories } = data
    
    return (
      <li>
        <div className="todo editing">
          <div>
            <form onSubmit={this.handleSave}>
              <div>
                <input
                  type="text"
                  name="title"
                  value={editingTodoTitle}
                  onChange={this.handleTodoTitleChange}
                />
                <DueDate value={this.state.dueDate} handleDueDateChange={this.handleDueDateChange}/>
              </div>
              <div>
                <label>
                  Move to another category
                </label>
                <select defaultValue={todo.category} onInput={this.handleTodoCategoryChange}>
                  {
                    categories.map(category => (
                      <option key={category.id} value={category.title}>{category.title}</option>
                    ))
                  }
                </select>
              </div>
              <div>
                <button type="submit">
                  Save
                </button>
                <button type="reset" onClick={() => state.reset()} >
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