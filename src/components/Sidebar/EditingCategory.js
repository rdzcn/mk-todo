import React from "react"

class EditingCategory extends React.Component {
  
	handleCategoryChange = event => {
    const category = event.target.value
    this.props.repo.updateEditingCategoryChange(category)
  }

  handleSave = (event) => {
    event.preventDefault()
    const { repo } = this.props
    const { editingCategory } = repo
		repo.saveCategory(editingCategory)
  }
  
  render() {
		const { editingCategory } = this.props.repo
    
    return (
      <li>
        <div className="category editing">
          <form onSubmit={this.handleSave}>
            <input
              type="text"
              name="category"
              value={editingCategory}
              onChange={this.handleCategoryChange}
            />
            <button type="submit">
              Save
            </button>
            <button type="button" onClick={() => this.props.repo.cancelEditingCategory()} >
              Cancel
            </button>
          </form>
        </div>
      </li>
    )
  }
}

export default EditingCategory