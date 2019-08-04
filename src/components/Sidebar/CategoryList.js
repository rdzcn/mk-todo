import React from 'react'
import Category from './Category'
import EditingCategory from './EditingCategory'

class CategoryList extends React.Component {
  
  render() {
    const { state, router } = this.props
    const { editingCategoryID } = state
    const { categories } = state.data
    return (
      <ul>
        {
          categories.map(category => {
            if (editingCategoryID === categories.indexOf(category)) {
              return <EditingCategory key={category} category={category} state={state} router={router} />
            } else {
              return <Category key={category} category={category} state={state} router={router} />
            }
          })
        }
      </ul>
    )
  }
}

export default CategoryList
