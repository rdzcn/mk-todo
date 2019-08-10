import React from 'react'
import NewCategory from './NewCategory'
import CategoryList from './CategoryList'
import Search from './Search'

const Sidebar = ({ state, router }) => {

  return (
    <ul>
      <Search state={state} router={router} />
      <CategoryList state={state} router={router} />
      <NewCategory state={state} router={router} />
    </ul>
  )
}

export default Sidebar