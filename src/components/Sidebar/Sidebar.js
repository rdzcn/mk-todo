import React from 'react'
import NewCategory from './NewCategory'
import CategoryList from './CategoryList'
import Search from './Search'

const Sidebar = ({ repo }) => {

  return (
    <ul>
      <Search repo={repo} />
      <CategoryList repo={repo} />
      <NewCategory repo={repo} />
    </ul>
  )
}

export default Sidebar