import React from "react"

class EditingCategory extends React.Component {
  
	handleCategoryChange = event => {
    const category = event.target.value
    this.props.state.updateEditingCategory(category)
    this.props.router.updateCategories(category)
    this.props.router.updatePathname(`/${category}`)
  }

  handleSave = (event) => {
    event.preventDefault()
    this.props.state.saveCategory()
  }
  
  render() {
		const { editingCategory } = this.props.state
    
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
            <button type="button" onClick={() => this.props.state.cancel()} >
              Cancel
            </button>
          </form>
        </div>
      </li>
    )
  }
}

export default EditingCategory