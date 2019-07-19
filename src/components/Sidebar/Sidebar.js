import React from 'react'
import NewCategory from './NewCategory'
import CategoryList from './CategoryList'
import Search from './Search'

const Sidebar = ({ repo, router }) => {

  return (
    <ul>
      <Search repo={repo} router={router} />
      <CategoryList repo={repo} router={router} />
      <NewCategory repo={repo} router={router} />
    </ul>
  )
}

export default Sidebar