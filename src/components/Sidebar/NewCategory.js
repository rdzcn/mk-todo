import React from "react"

class NewCategory extends React.Component {
  
  state = {
    categoryTitle: ""
  }

  handleCategoryTitleChange = event => {
    const categoryTitle = event.target.value
    this.setState({ 
      categoryTitle
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { categoryTitle } = this.state
    const { state, router } = this.props
    state.addCategory(categoryTitle)
    router.updatePathname(categoryTitle)
    router.updateCategories(categoryTitle)
    this.setState({
      categoryTitle: ""
    })
  }

  render() {
    const { categoryTitle } = this.state
    return (
      <div className="new-category">
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            value={categoryTitle} 
            onChange={this.handleCategoryTitleChange} 
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
