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

	handleTodoTitleChange = event => {
    const title = event.target.value
    const { state } = this.props
    state.updateTodoTitle(title)
  }

  handleDueDateChange = event => {
    const dueDate = event.target.value
    this.setState({ dueDate })
  }

  handleTodoCategoryChange = event => {
    const category = event.target.value
    this.setState({ category })
  }

  handleSave = event => {
		event.preventDefault()
    const { dueDate, category } = this.state
    const { state } = this.props
    let { todo } = this.props
    todo.dueDate = dueDate
    todo.category = category
    state.editTodo(todo)
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
                <button type="reset" onClick={() => state.cancel()} >
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