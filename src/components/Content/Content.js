import React from 'react'
import MainSection from './MainSection'
import SearchResults from './SearchResults'
 
const Content = ({ state }) => {
  
  const renderSearch = state.route === 'search'
  let component, header

  if (renderSearch) {
    header = `Searching for: ${state.searchFor}`
    component = <SearchResults state={state} />
  } else {
    header = state.route
    component = <MainSection state={state} />
  }

  return (
    <div>
      <h2 className="content-header">{header}</h2>
      {component}
    </div>
  )
}

export default Content