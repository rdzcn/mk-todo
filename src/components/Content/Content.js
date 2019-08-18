import React from 'react'
import MainSection from './MainSection'
import SearchResults from './SearchResults'
 
const Content = ({ router, state }) => {
  
  const renderSearch = state.route === 'search'
  let component, header

  if (renderSearch) {
    header = `Searching for: ${state.search}`
    component = <SearchResults state={state} router={router} />
  } else {
    header = state.route
    component = <MainSection state={state} router={router} />
  }

  return (
    <div>
      <h2 className="content-header">{header}</h2>
      {component}
    </div>
  )
}

export default Content