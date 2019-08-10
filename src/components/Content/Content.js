import React from 'react'
import MainSection from './MainSection'
import SearchResults from './SearchResults'
 
const Content = ({ router, state }) => {
  
  const renderSearch = router.route === 'search'
  let component, header

  if (renderSearch) {
    header = `Searching for: ${router.search}`
    component = <SearchResults state={state} router={router} />
  } else {
    header = router.route.charAt(0).toUpperCase() + router.route.slice(1)
    component = <MainSection state={state} router={router} />
  }

  return (
    <div>
      <h2 className="content-header">{ header }</h2>
      { component }
    </div>
  )
}

export default Content