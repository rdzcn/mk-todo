import React from 'react'
import Category from './Category'
import EditingCategory from './EditingCategory'

class CategoryList extends React.Component {
  
  render() {
    const { state, router } = this.props
    const { categories } = state.data
    return (
      <ul>
        {
          categories.map(category => {
            if (category.id === state.editingItemID) {
              return <EditingCategory key={category.id} category={category} state={state} router={router} />
            } else {
              return <Category key={category.id} category={category} state={state} router={router} />
            }
          })
        }
      </ul>
    )
  }
}

export default CategoryList
