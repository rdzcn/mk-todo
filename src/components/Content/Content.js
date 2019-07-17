import React from 'react'
import MainSection from './MainSection'
import SearchResults from './SearchResults'
 
const Content = ({ router, repo }) => {
  
  const renderSearch = router.route === 'search'
  let component, header

  if (renderSearch) {
    header = `Searching for: ${window.location.search.replace('?', '')}`
    component = <SearchResults repo={repo} router={router} />
  } else {
    header = router.route.charAt(0).toUpperCase() + router.route.slice(1)
    component = <MainSection repo={repo} router={router} />
  }

  return (
    <div>
      <h2 className="content-header">{ header }</h2>
      { component }
    </div>
  )
}

export default Content