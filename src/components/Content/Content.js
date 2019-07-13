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
    const { repo } = this.props
    return (
      <div>
        <NewTodo repo={repo} />
        <TodoList repo={repo} header="Todos" filters={[ this.filterUncompletedTodos, this.filterByCategory ]} />
        <ShowCompletedToggler repo={repo}>
          <TodoList repo={repo} header="CompletedTodos" filters={[ this.filterCompletedTodos, this.filterByCategory ]} />
        </ShowCompletedToggler>
      </div>
    )
  }
}

export default Content
