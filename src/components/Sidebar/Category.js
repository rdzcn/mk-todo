import React from 'react'
import Link from '../_shared/Link'

class Category extends React.Component {

  render() {
    const { state, category, router } = this.props
    
    return (
      <li key={category} className="sidebar-category">
        <div>
          <Link to={category} router={router}>
            {category}
          </Link>
          <button onClick={() => state.editCategory(category)}>
            Rename
          </button>
          <button onClick={() => state.deleteCategory(category)}>
            Delete
          </button>
        </div>
      </li>
    )
  }
}

export default Category