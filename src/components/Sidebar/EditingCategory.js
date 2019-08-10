import React from "react"

class EditingCategory extends React.Component {
  
	handleCategoryChange = event => {
    const category = event.target.value
    const { state, router } = this.props
    state.updateEditingCategory(category)
    router.updatePathname(`/${category}`)
  }
  
  handleSave = event => {
    event.preventDefault()
    const { state, router, category } = this.props
    const { editingCategory } = state
    if (!editingCategory) {
      router.resetPath()
    } else {
      const prevCategoryIndex = router.categories.indexOf(category)
      state.saveCategory(prevCategoryIndex)
      router.updateCategories(editingCategory)
    }
  }
  
  render() {
    const { category, router, state } = this.props
    const { editingCategory } = state
    
    return (
      <li>
        <div className="category editing">
          <form onSubmit={this.handleSave}>
            <input
              type="text"
              name="category"
              value={editingCategory || category}
              onChange={this.handleCategoryChange}
            />
            <button type="submit">
              Save
            </button>
            <button type="button" onClick={() => router.resetPath()} >
              Cancel
            </button>
          </form>
        </div>
      </li>
    )
  }
}

export default EditingCategory