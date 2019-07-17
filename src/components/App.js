import React from 'react'
import Content from './Content/Content'
import Sidebar from './Sidebar/Sidebar'

class App extends React.Component {
	
  sortTitle(todos) {
    return todos.sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase))
  }

  sortCreatedAt(todos) {
    return todos.sort((a,b) => b.createdAt - a.createdAt)
  }

  sortModifiedAt(todos) {
    return todos.sort((a,b) => b.modifiedAt - a.modifiedAt)
  }

  sortDueDate(todos) {
    return todos.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))
  }
	
  render() {
    const { router, repo } = this.props

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
}

export default App
