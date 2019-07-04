# Week-25 Tasks and Progress

1. Please start this week by opening a pull request with the title “Week 26”. This is so that we don’t forget, and the work will be visible at all times and not when it’s ready. It improves communication.

- Done.

2. Please add an instruction how to use automatic formatting in the README file.

- work on eslint-setup branch

3. When user selects a List by clicking on it in the left column, its title in the list becomes bold.

- `button:focus { font-weight: 700; }`

4. Implement unit tests for the State class:
  • addTodo(“Hello”, null) should add todo with a title “Hello" to the storage
    -
  • addTodo(null, null) should not add a todo to the storage
  • completeTodo should complete and uncompleted todos in the storage
  • saveTodo should save the editing title in the storage
  • deleteTodo should remove the todo from the storage

5. Make sorter a function and not a string. const sortedTodos = sorter(todos). Add unit tests for every sorter we have.



6. Rename fetchTodos to filter. I would like to have two filter functions (from now on I will call them just “filters") for now: filterUncomletedTodos and filterCompletedTodos. Filter accepts an array A of todos and returns an array A' of todos that includes all or some of the todos from array A. TodoList component should accept two parameters: repo and an array of filters. For the uncompleted list, it should look like this: <TodoList repo={repo} filters={[ filterUncompletedTodos ]} />. For completed list: <TodoList repo={repo} filters={[ filterCompletedTodos ]} />



7. Implement tests for these filters.



8. Make filtering by list also a filter:
`<TodoList repo={repo} filters={[ filterUncompletedTodos, filterByList(‘groceries’) ]} />`
`filterByList` is a higher-order function: it’s a function that returns another function. Sometimes these are called “factory functions (methods)”.



9. Implement renaming of lists. I would like to create lists like Groceries, Family, Work etc. Begin by adding unit tests for it.

 - renamed the lists. 

10. It should be possible for a task not to have a due date (due date should be nullable)

 - implemented. `todo.dueDate = ""` in that case. 

11. Implement the following: currently selected list ID needs to be visible in the `window.location.href: https://deploy-preview-6--angry-goldstine-203e71.netlify.com/groceries` should open the “Groceries” list, also when I reload the page. When I click on the Groceries list, it should change the URL too, without reloading the page.



12. Implement `ShowCompletedToggler` component. It should accept repo as its only parameter. It should contain all the logic whether to show “Show” or “Hide” button, and it should interact with the repo directly.



13. Please split the Todo component into two components: Todo and EditingTodo. The EditingTodo component should be shown whenever the todo is being edited.



14. Implement moving tasks between lists. Begin by adding unit tests for it.



15. Very difficult, I don’t expect you to finish it this week: add a search field that would search all of the todo titles in the State. When user starts entering text “foo" in the search field, the title of the list changes to “Search for ‘foo'” and only the todos with the ‘foo’ in their title show up in the TodoList. Add unit tests for this function.

