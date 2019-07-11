# Week-25

1. I don’t think we’ve implemented automatic formatting. Please add an eslint configuration and start using it. Please reformat all of the source files. Please merge the formatting fixes as a separate pull request before starting to work on this week’s assignment.
2. Introduce a notion of a List. List is a parent entity for a Todo.
3. List can have many Todos, but each Todo belongs only to a single List. Todos can’t be outside of a List.
4. The UI of the app should consist of two columns: first column is a list of Lists, second column has the title of currently selected List and the list of its Todos.
5. When user selects a List by clicking on it in the left column, its title in the list becomes bold and the Todos from this list are presented in the right column.
6. Right column should contain the current application.
7. Lists should be persisted to localStorage.
8. Implement editing a due date on an existing Todo.
9. Fix a bug: when selecting the due date field, clicking on the year and pressing the down button, the year jumps to 275760. Should be 2018:
10. Please extract the due date field into a separate React component and reuse it when adding a new todo and when editing an existing todo.
11. Please store the due date on the todo not as a Date object but as a string: “2019-06-18”.
12. Please fix a bug: don’t allow empty title fields
13. State should maintain the editing title of a todo.
14. Very important and difficult: learn about Event Emitters in JavaScript. Make State class an event emitter. Every time something inside the state changes, it should emit “stateChanged” event. Subscribe your App component to the stateChanged event. Every time stateChanged is fired, App component should update itself.
15. Very important and difficult: implement a PersistentStorage class. It should have two methods: “read” and “write”. It should be reading the data from localStorage and converting it to JavaScript objects, and writing JSON back to the localStorage. State class should accept a PersistentStorage class instance as a parameter. Implement another class with the same interface (“read” and “write” methods) and call it TemporaryStorage. It should simply have a property called “data” and not persist anything to the localStorage.
16. Implement unit tests for the State class:  
    a. addTodo(“Hello”, null) should add todo with a title “Hello" to the storage  
    b. addTodo(null, null) should not add a todo to the storage  
    c. completeTodo should complete and uncompleted todos in the storage  
    d. saveTodo should save the editing title in the storage  
    e. deleteTodo should remove the todo from the storage
17. Within the unit tests State should use TemporaryStorage, within the production app it should use PersistentStorage. This will make sure your unit tests can run outside of a browser, because localStorage doesn’t exist outside of the browser.
18. Make sorter a function and not a string. const sortedTodos = sorter(todos). Add unit tests for every sorter we have.
19. Add a filter property to the TodoList component. filter should be a function: const filteredTodos = filter(allTodos). Let the normal TodoList have a filter function that includes only uncompleted todos, and the completed TodoList have a filter that includes only completed todos. Add unit tests for these filters.
20. Very difficult, I don’t expect you to finish it this week: add a search field that would search all of the todo titles in the State. When user starts entering text “foo" in the search field, the title of the list changes to “Search for ‘foo'” and only the todos with the ‘foo’ in their title show up in the TodoList. Add unit tests for this function.

# Progress

1. Working on branch `eslint-setup`

2. Data is structured this way now: 
  ```
  {
    todos: {2019-06-25: [{title: "buy milk", completed: false, ....}, {title: "do the dishes",....}],
            2019-06-26: [{...}],
            ...
           },
    showCompleted: true
   }
   ```  
3. This way a Todo belongs to only one List/Date  

4. Left column shows clickable dates. When clicked, data is filtered to display todos only from the selected date. 

5. `bold` transition still to be implemented. 

6. Right column contains the main part of the UI.

7. Persisting on localStorage.

8. Edit button now allows not only editing of the title but also the dueDate.

9. Setting a minimum value to `input type="date"` causes such behavior. Removed minimum value. 

10. Created `DueDate.js`. 

11. Fixed in commit [a1cb856](https://github.com/rdzcn/mk-todo/commit/a1cb856c8ce0e5261a27585d50bf3e5b08c57869)  

12. Fixed in commit [a1cb856](https://github.com/rdzcn/mk-todo/commit/a1cb856c8ce0e5261a27585d50bf3e5b08c57869)  

13. State manages editing title. However, it does not manage the adding-todo title. That is still managed by the NewTodo component. 

14. When we `persist` changes to localStorage, we emit `stateChanged` action. This is picked up in `index.js` with a callback function to re-render App component.  
  ```
  const repo = new State()
  repo.on('stateChanged', () => {
    ReactDOM.render(<App repo={repo}/>, document.getElementById('root'))
  })
  ```
  
15. PersistentStorage is working. TemporaryStorage is working. 

16.

17. Running tests with TemporaryStorage. 

18.

19. See `fetchTodos(todos)` in TodoList.

```
fetchTodos = todos => {
		let filteredTodos
		if (this.props.completed) {
			filteredTodos = todos.filter(todo => todo.completed) || []
		} else {
			filteredTodos = todos.filter(todo => !todo.completed) || []
		}
		return filteredTodos
	}
```

20.
