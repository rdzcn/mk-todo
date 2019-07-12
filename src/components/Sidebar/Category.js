import React from 'react'

class Category extends React.Component {

  render() {
    const { repo, category } = this.props
    
    return (
      <li key={category} className="sidebar-category">
        <div>
          <button onClick={() => repo.updateSelectedCategory(category)}>
            {category}
          </button>
          <button onClick={() => repo.editCategory(category)}>
            Rename
          </button>
          <button onClick={() => repo.deleteCategory(category)}>
            Delete
          </button>
        </div>
      </li>
    )
  }
}

export default Category