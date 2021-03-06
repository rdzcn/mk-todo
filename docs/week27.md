# Week-27 Tasks and Progress

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
    - done
  • saveTodo should save the editing title in the storage
    - done
  • deleteTodo should remove the todo from the storage
    - done

4. Make sorter a function and not a string. const sortedTodos = sorter(todos). Add unit tests for every sorter we have.

  - `MainSection` has an object with key/value pairs where key is `sorter` and value is `sorterMethod`. `MainSection` passes this object to  `TodoList` as a prop.  
  - Default sorter is `createdAt`. 
  - `TodoList` has `<select>` element with `<option>`s. When user selects an option, `router` updates `window.location.search` with the selected `sorter`.  
  - `App` is re-rendered. `TodoList` sorts todos according to `sorterMethod`. 

5. Implement tests for these filters.


6. Implement renaming of lists. I would like to create lists like Groceries, Family, Work etc. Begin by adding unit tests for it.

 - Implemented by making `Category` to function like `Todo`. Hence, `NewCategory`, `Category`, `EditingCategory` and `CategoryList`.

7. Implement the following: currently selected list ID needs to be visible in the `window.location.href: https://deploy-preview-6--angry-goldstine-203e71.netlify.com/groceries` should open the “Groceries” list, also when I reload the page. When I click on the Groceries list, it should change the URL too, without reloading the page.



8. Implement `ShowCompletedToggler` component. It should accept state as its only parameter. It should contain all the logic whether to show “Show” or “Hide” button, and it should interact with the state directly.

- Done. [commit](https://github.com/rdzcn/mk-todo/pull/10/commits/bc4908ab14ea22fe148a7fc891a74067cf37ca28)

9. Implement moving tasks between lists. Begin by adding unit tests for it.

  - Did it but again not starting with the tests. Tests to follow.

10. Very difficult, I don’t expect you to finish it this week: add a search field that would search all of the todo titles in the State. When user starts entering text “foo" in the search field, the title of the list changes to “Search for ‘foo'” and only the todos with the ‘foo’ in their title show up in the TodoList. Add unit tests for this function.

- Tests are missing. [commit](https://github.com/rdzcn/mk-todo/commit/0d67dd11258e35855f2166908ac0b9a571dd18a5)

# Remaining from Week 26

1. How would you make sure that month is between 01 and 12 and day is between 01 and 31? How would you make sure that impossible dates (02-31) are rejected? 

- Modified the conditon to include `!isNaN(Date.parse(dueDate))`
  ```
    const dueDateFormat = /\d{4}-\d{2}-\d{2}/
    if (dueDate.match(dueDateFormat) && !isNaN(Date.parse(dueDate))) {
      dueDate = new Date(dueDate).toISOString().substr(0, 10);
    } else {
      dueDate = ""
    }
  ```
- `Date.parse("2019-02-31")` returns `NaN`. 

# Ideas to implement

1. Only one kind of editing can be done simultaneously: either edit `category` or `todo`. Introduce a global editing/readOnly variable to decide which particular item will be edited. 

2. Remove `SearchResults` component and re-use `TodoList` component. 

3. Remove State instance variables `editingID`, `editingTitle`, `editingCategory` and `editingCategoryID`. `Router` can handle these "temp" variables in the URL. 

4. Move `<select>` elements into a `Select` component which receives an `<option>`s array as a prop. 

5. How to handle temporary instance variables in React such as `this.state.title`? It is populated and set to '' after certain actions. Is it better or worse practice to capture the user input solely from URL? 


