  
import React from 'react'
import Link from '../_shared/Link'

class Category extends React.Component {

  render() {
    const { repo, category, router } = this.props
    
    return (
      <li key={category} className="sidebar-category">
        <div>
          <Link to={category} router={router}>{category}</Link>
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