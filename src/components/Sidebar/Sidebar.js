import React from 'react'
import NewCategory from './NewCategory'
import CategoryList from './CategoryList'

const Sidebar = ({ repo }) => {

  return (
    <ul>
      <CategoryList repo={repo} />
      <NewCategory repo={repo} />
    </ul>
  )
}

export default Sidebar