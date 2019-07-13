import React from "react"

class EditingCategory extends React.Component {
  
	handleCategoryChange = event => {
    const category = event.target.value
    this.props.repo.updateEditingCategory(category)
  }

  handleSave = (event) => {
    event.preventDefault()
    this.props.repo.saveCategory()
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
            <button type="button" onClick={() => this.props.repo.cancel()} >
              Cancel
            </button>
          </form>
        </div>
      </li>
    )
  }
}

export default EditingCategory