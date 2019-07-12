import React from 'react'
import NewTodo from './Content/NewTodo'
import TodoList from './Content/TodoList'
import ShowCompletedToggler from './Content/ShowCompletedToggler'
import Sidebar from './Sidebar/Sidebar'

class App extends React.Component {
	
  filterUncompletedTodos(todos) {
    return todos.filter(todo => !todo.completed)
  }

  filterCompletedTodos(todos) {
    return todos.filter(todo => todo.completed)
  }

  filterByCategory(category) {
    return todos => { 
      return todos.filter(todo => todo.category === category) 
    }
  }
	
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
    const { showCompleted } = repo.data

    return (
      <React.Fragment>
        <div className="app-container">
          <header className="main header">
            <h1>Your Todo App #1</h1>
          </header>
          <aside className="main left">
            <Sidebar repo={repo} />
          </aside>
          <div className="main right">
            <NewTodo repo={repo} />
            <TodoList repo={repo} filters={[ this.filterUncompletedTodos, this.filterByCategory ]} />
            <ShowCompletedToggler repo={repo} />
            { 
              showCompleted ? 
                <TodoList repo={repo} completed="true" filters={[ this.filterCompletedTodos, this.filterByCategory ]} /> :
                null 
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App
