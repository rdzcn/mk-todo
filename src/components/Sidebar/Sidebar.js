import React from 'react'
import NewCategory from './NewCategory'
import CategoryList from './CategoryList'
import Search from './Search'

const Sidebar = ({ state, router }) => {

  return (
    <ul>
      <Search state={state} />
      <CategoryList state={state} />
      <NewCategory state={state} />
    </ul>
  )
}

export default Sidebar