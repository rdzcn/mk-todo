# Week-27 fix

1. Reuse TodoList instead of SearchResults

  -  

2. Re-do `Router`.   

  a. Remove temporary editing state from router.  

    - 

  b. Router should communicate with State instead having access to data. 

    - 

3. We need a temp router to run in node context (for tests). 

  -  

4. Implement tests for filters.

  - 

5. Work on `stateActions.test`. 

  a. Check also todo contents rather than only the length of `todos`.

  b. To test `deleteTodo`, first add 3 todos, then delete the second one, and check for the 1st and the 3rd ones. 

  c. `saveTodo`: compare object to object instead of per property. 

6. 