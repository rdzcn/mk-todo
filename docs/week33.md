# Week-27 fix

1. Reuse TodoList instead of SearchResults.

  -  

2. Re-do `Router`.   

  a. Remove temporary editing state from router.  

    - 

  b. Router should communicate with State instead having access to data. Maybe state should contain router. 

    - 

  c. Can you please distill the bullet list of what it should do and what it shouldn't do?

    -

  d. For one, I think it should be agnostic to the data layer. It shouldn't know about categories. Perhaps it should be a helpful abstraction over URL management and change notifications.

    - 
    
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

  -

8. Change `editingTitle` to `editingTodoTitle`. 

9. Change `categories` into an object with each `category` having an ID and a title property. 

10. 