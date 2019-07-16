import React from 'react'
import NewTodo from './NewTodo'
import TodoList from './TodoList'
import ShowCompletedToggler from './ShowCompletedToggler'

class Content extends React.Component {

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
  
  render() {
    const { repo, router } = this.props
    return (
      <div>
        <NewTodo repo={repo} router={router} />
        <TodoList repo={repo} router={router} header="Todos" filters={[ this.filterUncompletedTodos, this.filterByCategory ]} />
        <ShowCompletedToggler repo={repo}>
          <TodoList repo={repo} router={router} header="CompletedTodos" filters={[ this.filterCompletedTodos, this.filterByCategory ]} />
        </ShowCompletedToggler>
      </div>
    )
  }
}

export default Content
