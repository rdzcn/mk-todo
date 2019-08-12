import React from 'react'
import Link from '../_shared/Link'

class Category extends React.Component {

  handleRename = () => {
    const { router, category } = this.props
    router.updatePathname(category.title)
    router.updatePathSearch(category.title)
  }

  render() {
    const { state, category, router } = this.props
    
    return (
      <li key={category} className="sidebar-category">
        <div>
          <Link to={category.title} router={router}>
            {category.title}
          </Link>
          <button onClick={this.handleRename}>
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