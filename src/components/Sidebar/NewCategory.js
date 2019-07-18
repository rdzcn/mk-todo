import React from "react"

class NewCategory extends React.Component {
  
  state = {
    categoryName: ""
  }

  handleCategoryNameChange = event => {
    const categoryName = event.target.value
    this.setState({ 
      categoryName
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { categoryName } = this.state
    const { repo, router } = this.props
    repo.addCategory(categoryName)
    router.updatePathname(categoryName)
    router.updateCategories(categoryName)
    this.setState({
      categoryName: ""
    })
  }

  render() {
    const { categoryName } = this.state
    return (
      <div className="new-category">
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            value={categoryName} 
            onChange={this.handleCategoryNameChange} 
          />
          <button type="submit">
            Add Category
          </button>
        </form>
      </div>     
    )
  }
}

export default NewCategory
