import React from "react"

class EditingCategory extends React.Component {
  
	handleCategoryTitleChange = event => {
    const title = event.target.value
    const { state } = this.props
    state.updateCategoryTitle(title)
  }
  
  handleSave = event => {
    event.preventDefault()
    const { state, category } = this.props
    state.editCategory(category.id)
  }
  
  render() {
    const { state } = this.props
    const { editingCategoryTitle } = state
    
    return (
      <li>
        <div className="category editing">
          <form onSubmit={this.handleSave}>
            <input
              type="text"
              name="category"
              value={editingCategoryTitle}
              onChange={this.handleCategoryTitleChange}
            />
            <button type="submit">
              Save
            </button>
            <button type="button" onClick={() => state.cancel()} >
              Cancel
            </button>
          </form>
        </div>
      </li>
    )
  }
}

export default EditingCategory