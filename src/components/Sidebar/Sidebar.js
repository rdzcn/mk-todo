import React from 'react'
 
class Sidebar extends React.Component {

  state = {
    categoryName: ""
  }

  deleteCategoryName = event => {
    const { categories } = this.props.repo.data
    const category = event.target.value
    const index = categories.indexOf(category)
    this.props.repo.deleteCategoryName(index)
  }

  renameCategoryName = event => {

  }

  handleCategoryNameChange = event => {
    const newCategoryName = event.target.value
    this.setState({ 
      categoryName: newCategoryName 
    })
  }

  addNewCategory = () => {
    const { categoryName } = this.state
    this.props.repo.addNewCategory(categoryName)
    this.setState({
      categoryName: ""
    })
  }

  renderCategories = () => {
    const { categories } = this.props.repo.data
    const { repo } = this.props
    const component = categories.map(category => {
      return (  
          <li key={category} className="sidebar-category">
            <div>
              <button type="button" onClick={() => repo.updateSelectedCategory(category)}>
                {category}
              </button>
              <button type="button" value={category} onClick={this.renameCategoryName}>
                Rename
              </button>
              <button type="button" value={category} onClick={this.deleteCategoryName}>
                Delete
              </button>
            </div>
          </li>
      )
    })
    return component
  }

  render() {
    const categories = this.renderCategories()
    return (
      <ul>
        {categories}
        <form onSubmit={this.addNewCategory}>
          <input type="text" onChange={this.handleCategoryNameChange} />
          <button type="submit">
            Add Category
          </button>
        </form>     
      </ul>
    )
  }
}

export default Sidebar