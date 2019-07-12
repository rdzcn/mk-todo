# Week-25 Tasks and Progress

1. Please start this week by opening a pull request with the title “Week 27”. 

- Done.

2. Please add an instruction how to use automatic formatting in the README file.

- 

3. Implement unit tests for the State class:

  • addTodo(“Hello”, null) should add todo with a title “Hello" to the storage
    - [commit](https://github.com/rdzcn/mk-todo/commit/46f553b5564af036f181c3663db97a82b40e005a) 
  • addTodo(null, null) should not add a todo to the storage
    - [commit](https://github.com/rdzcn/mk-todo/commit/46f553b5564af036f181c3663db97a82b40e005a)
  • completeTodo should complete and uncompleted todos in the storage
    -
  • saveTodo should save the editing title in the storage
    -
  • deleteTodo should remove the todo from the storage
    -

4. Make sorter a function and not a string. const sortedTodos = sorter(todos). Add unit tests for every sorter we have.


5. Implement tests for these filters.


6. Implement renaming of lists. I would like to create lists like Groceries, Family, Work etc. Begin by adding unit tests for it.

 - 

7. Implement the following: currently selected list ID needs to be visible in the `window.location.href: https://deploy-preview-6--angry-goldstine-203e71.netlify.com/groceries` should open the “Groceries” list, also when I reload the page. When I click on the Groceries list, it should change the URL too, without reloading the page.



8. Implement `ShowCompletedToggler` component. It should accept repo as its only parameter. It should contain all the logic whether to show “Show” or “Hide” button, and it should interact with the repo directly.

- Done. [commit](https://github.com/rdzcn/mk-todo/pull/10/commits/bc4908ab14ea22fe148a7fc891a74067cf37ca28)

9. Implement moving tasks between lists. Begin by adding unit tests for it.

  - Did it but again not starting with the tests. Tests to follow. 

10. Very difficult, I don’t expect you to finish it this week: add a search field that would search all of the todo titles in the State. When user starts entering text “foo" in the search field, the title of the list changes to “Search for ‘foo'” and only the todos with the ‘foo’ in their title show up in the TodoList. Add unit tests for this function.

