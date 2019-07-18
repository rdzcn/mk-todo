import React from 'react'
import NewCategory from './NewCategory'
import CategoryList from './CategoryList'
import Search from './Search'

const Sidebar = ({ repo, router }) => {

  return (
    <ul>
      <Search router={router} repo={repo} />
      <CategoryList repo={repo} router={router} />
      <NewCategory repo={repo} router={router} />
    </ul>
  )
}

export default Sidebar