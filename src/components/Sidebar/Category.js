import React from 'react'
import Link from '../_shared/Link'

class Category extends React.Component {

  render() {
    const { state, category, router } = this.props
    
    return (
      <li key={category.id} className="sidebar-category">
        <div>
          <Link to={category.title} router={router}>
            {category.title}
          </Link>
          <button onClick={() => state.switchToEditingCategory(category.id)}>
            Rename
          </button>
          <button onClick={() => state.deleteCategory(category.id)}>
            Delete
          </button>
        </div>
      </li>
    )
  }
}

export default Category