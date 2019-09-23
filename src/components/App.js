import React from 'react'
import Content from './Content/Content'
import Sidebar from './Sidebar/Sidebar'

const App = ({ state, router }) => {

  return (
    <React.Fragment>
      <div className="app-container">
        <header className="main header">
          <h1>Your #1 Todo App</h1>
          <div className='menu-icon' onClick={state.handleMenuClick}>
            <div className='menu-icon-line'></div>
            <div className='menu-icon-line'></div>
            <div className='menu-icon-line'></div>
          </div>
        </header>
        <aside className="main left">	
          <Sidebar state={state} router={router} />
        </aside>
        <div className="main right">
          <Content state={state} router={router} /> 
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
