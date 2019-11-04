import React from 'react'
import Link from '../_shared/Link'

class Category extends React.Component {

  render() {
    const { state, category } = this.props
    
    return (
      <li key={category.id} className="sidebar-category">
        <div>
          <Link to={category.title} state={state}>
            {category.title}
          </Link>
          <button onClick={() => state.switchToEditingCategory(category)}>
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