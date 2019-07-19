import React from 'react'
import Content from './Content/Content'
import Sidebar from './Sidebar/Sidebar'

const App = ({ repo, router }) => {
  return (
    <React.Fragment>
      <div className="app-container">
        <header className="main header">
          <h1>Your #1 Todo App</h1>
        </header>
        <aside className="main left">	
          <Sidebar repo={repo} router={router} />
        </aside>
        <div className="main right">
          <Content repo={repo} router={router} /> 
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
