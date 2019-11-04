# Week-27 fix

1. Reuse TodoList instead of SearchResults.

  -

2. Re-do `Router`.

  a. Remove temporary editing state from router.

    - We have now in State:
      ```
      this.editingTodoTitle = null
      this.editingCategoryTitle = null
      this.editingItemID = null
      this.searchFor = ''
      ```
  b. Router should communicate with State instead having access to data. Maybe state should contain router.

    - `router` is an object within State class. It has only one method: `getRoutes`, which returns an object, `routes`, with key/value pairs for `pathname`/`route`. `State` calls this method to decide on 

  c. Can you please distill the bullet list of what it should do and what it shouldn't do?

    - It constructs a list of pathnames with matching routes. 

  d. For one, I think it should be agnostic to the data layer. It shouldn't know about categories. Perhaps it should be a helpful abstraction over URL management and change notifications.

    - It has access to data only through `State`. 

3. We need a temp router to run in node context (for tests).

  -

4. Implement tests for filters.

  -

5. Work on `stateActions.test`.

  a. Check also todo contents rather than only the length of `todos`.

  b. To test `deleteTodo`, first add 3 todos, then delete the second one, and check for the 1st and the 3rd ones.

  c. `saveTodo`: compare object to object instead of per property.

6. Re-think `sorting`.

  -

7. Re-think `filters`.

  - `filters` prop is an object and not an array anymore`filters={{category: filterByCategory, completion: filterCompleted}}`

8. Change `editingTitle` to `editingTodoTitle`.

  - Done. 

9. Change `categories` into an object with each `category` having an ID and a title property.

  - Done. 


# Week33 Tasks

1. Please convert categories to proper objects with an ID and a title. Instead of operating on strings, refactor the app to operate on ids.

  - Not using the `id`s but the `title`s. I will look into that. 

2. Router is a great idea, I’m glad you came up with it. We need to refactor it so that it serves our app nicely. I would suggest that we encapsulate it in the State. State might have methods like `navigateToCategory(categoryID)` which would cause changes to the Router. Whenever something in the Router changes, State will get notified and change something in itself, cause stateChanged notification and the React layer will be updated. Please experiment with it and try

  - Not using the `id`s but the `title`s. I will look into that. 
