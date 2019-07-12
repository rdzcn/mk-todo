import React from "react"

class NewCategory extends React.Component {
  
  state = {
    categoryName: ""
  }

  handleCategoryNameChange = event => {
    const newCategoryName = event.target.value
    this.setState({ 
      categoryName: newCategoryName 
    })
  }

  addNewCategory = () => {
    const { categoryName } = this.state
    this.setState({
      categoryName: ""
    }, this.props.repo.addNewCategory(categoryName))
  }

  render() {
    const { categoryName } = this.state
    return (
      <form onSubmit={this.addNewCategory}>
        <input 
          type="text" 
          value={categoryName} 
          onChange={this.handleCategoryNameChange} 
        />
        <button type="submit">
          Add Category
        </button>
      </form>     
    )
  }
}

export default NewCategory
