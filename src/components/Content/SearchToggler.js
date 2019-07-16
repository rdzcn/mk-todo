import React from 'react'
import Content from './Content'
import SearchingTodoList from './SearchingTodoList'
 
const SearchToggler = ({ router, repo }) => {
  
  const renderSearch = router.route === 'search'
  let component, header

  if (renderSearch) {
    header = `Searching for: ${window.location.search.replace('?', '')}`
    component = <SearchingTodoList repo={repo} router={router} />
  } else {
    header = router.route.charAt(0).toUpperCase() + router.route.slice(1)
    component = <Content repo={repo} router={router} />
  }

  return (
    <div>
      <h2 className="content-header">{ header }</h2>
      { component }
    </div>
  )
}

export default SearchToggler