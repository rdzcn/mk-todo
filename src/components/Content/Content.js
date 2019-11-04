import React from 'react'
import MainSection from './MainSection'
import SearchResults from './SearchResults'
 
const Content = ({ state }) => {
  
  const renderContent = state.route
  const renderSearch = state.route === 'search'
  let component, header

  if (renderSearch) {
    header = `Searching for: ${state.searchFor}`
    component = <SearchResults state={state} />
  } else if (renderContent) {
    header = state.route
    component = <MainSection state={state} />
  } else {
    header = 'Not Found! You seem to be lost!'
    component = <h1>404</h1>
  }

  return (
    <div>
      <h2 className="content-header">{header}</h2>
      {component}
    </div>
  )
}

export default Content