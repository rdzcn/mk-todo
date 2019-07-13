import React from 'react'
import Category from './Category'
import EditingCategory from './EditingCategory'

class CategoryList extends React.Component {
  
  render() {
    const { repo } = this.props
    const { editingCategoryID } = repo
    const { categories } = repo.data
    return (
      <ul>
        {
          categories.map(category => {
            if (editingCategoryID === categories.indexOf(category)) {
              return <EditingCategory key={category} category={category} repo={repo} />
            } else {
              return <Category key={category} category={category} repo={repo} />
            }
          })
        }
      </ul>
    )
  }
}

export default CategoryList
