# Week 24

1. Please address all of the comments from the previous pull requests. When addressing them, please write a short summary how you addressed a comment in a reply to this comment.
2. Please use https://www.npmjs.com/package/uuid for generating uuids. It should simplify the ID logic a lot.
3. Please add a Cancel button when editing a todo’s title. It should hide the input field and display the old title of a todo.
4. Create a new class called State. Extract all of the logic of interacting with localStorage to this class.
5. Please add a due date property to a todo. When creating or editing a todo, user should be able to specify a due date for this todo. Please use the built-in calendar picker https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date.
6. When the date is set, show it under the todos title.
7. Please apply the following rule to the due date: text is blue if the date is in the future; text is green if the due date is today; text is red if the due date is in the past.
8. This week we start adding unit tests. Please add a shortcut in `package.json` to run the whole unit test suite with a single short command.
9. Add a unit test for the function that returns the colour of the due date. This test should test all three requirements from the previous point, plus some edge cases (pass a null, a string instead of a date). The function should be called `colourForDueDate` and have two parameters: `today` and `dueDate`.
10. Please add a dropdown (<select>) component for sorting the uncompleted todo list. There should be the following options: Alphabetically, By Creation Date, By Modified Date, By Due Date. The TodoList component should have a `sorter` parameter which accepts a comparator function. The `sorter` parameter should be switched with the dropdown component.
11. Comparator function needs to accept two todos. Please refer to the documentation https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
12. Please add unit tests for each of the comparator functions. There should be at least three tests for each: ascending, descending and equal scenarios.
13. Please add integration with Travis CI that will automatically run your unit tests and post the result to the opened pull request.
14. Please unify TodoList and CompletedTodoList into a single component. The component should accept a `fetchTodos` parameter which is a function that returns a filtered array of todos from the application state.
15. Please move the title of a particular TodoList to the component itself. The title should be specifiable from the outside of the component. The counter needs to be appended automatically.
16. Please unify the Todo and CompletedTodo components. The unified component should decide for itself how to look based on the data. 
