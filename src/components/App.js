import React from 'react'
import Content from './Content/Content'
import Sidebar from './Sidebar/Sidebar'
import SearchingTodoList from './Content/SearchingTodoList'

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
    const { repo } = this.props

    return (
      <React.Fragment>
        <div className="app-container">
          <header className="main header">
            <h1>Your #1 Todo App</h1>
            { console.log(this.props.pathname) }
          </header>
          <aside className="main left">
            <Sidebar repo={repo} />
          </aside>
          <div className="main right">
            <h2 className="content-header">{repo.selectedCategory.charAt(0).toUpperCase() + repo.selectedCategory.slice(1)}</h2>
            {repo.searchText === '' ? <Content repo={repo} /> : <SearchingTodoList repo={repo} /> }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App
