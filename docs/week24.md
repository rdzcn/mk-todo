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
10. Please add a dropdown (`<select>`) component for sorting the uncompleted todo list. There should be the following options: Alphabetically, By Creation Date, By Modified Date, By Due Date. The TodoList component should have a `sorter` parameter which accepts a comparator function. The `sorter` parameter should be switched with the dropdown component.
11. Comparator function needs to accept two todos. Please refer to the documentation https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
12. Please add unit tests for each of the comparator functions. There should be at least three tests for each: ascending, descending and equal scenarios.
13. Please add integration with Travis CI that will automatically run your unit tests and post the result to the opened pull request.
14. Please unify TodoList and CompletedTodoList into a single component. The component should accept a `fetchTodos` parameter which is a function that returns a filtered array of todos from the application state.
15. Please move the title of a particular TodoList to the component itself. The title should be specifiable from the outside of the component. The counter needs to be appended automatically.
16. Please unify the Todo and CompletedTodo components. The unified component should decide for itself how to look based on the data.

# Progress

1. Will go through once again to check if all have been addressed.

2. Added uuid. However, it didn't work. It couldn't find babel-loader in the node_modules. Added `babel-loader` as a devDependency and it worked.
Update: It worked in development and not in production. Ran `yarn build`. It gave an error that `create-react-app` uses version 8.0.5. Installed version was 8.0.6. Changed that. It works in production as well.

3. Add a button: Cancel. When Save is clicked we pass todo.state.title (i.e., edited title) and todo.id to props.saveTodo function. App.saveTodo then finds the todo with the matching id and saves the title. Now with cancel, instead of passing the todo.state.title, we can pass todo.title (i.e., non-edited, previous title) and todo.id to props.saveTodo. See the difference:

```
handleSave = (id) => {
  const { title } = this.state
  this.props.saveTodo(id, title)
}

handleCancel = (id, title) => {
  this.props.saveTodo(id, title)
}
```
4. ~~Moved all the state to State. Running everything in State and using props.children in Child components.~~ Confused it with React Class Component. Created a JS Class object called State which handles the data and acts as a repository. 

5. As value for the `input type="date value={today}` used `const today = new Date().toISOString().substr(0, 10)`. The date should be in the form `YYYY-MM-DD` so that it can be used as input value. It also has a `min` attribute as `min={today}`, i.e., the user cannot set a due date in the past.

6. As the todo items are list items, used `<br />` to put the due date under the title.

7. Changed the logic here. `colorForDueDate` takes two parameters: `today` and `tomorrow`. We compare years, months and days of each date and decide on the color. 

8. `yarn test`

9.

10. Added `TodoList.state.sorter` which takes the following values based on the options: `a-z`, `modifiedAt`, `createdAt` and `dueDate`. Comparator function is as follows:

```
sortUncompleted = (a, b) => {
  const { sorter } = this.state
  switch (sorter) {
    case "a-z":
     return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    case "modifiedAt":
      return a.modifiedAt - b.modifiedAt
    case "createdAt":
      return a.createdAt - b.createdAt
    case "dueDate":
      return new Date(a.dueDate) - new Date(b.dueDate)
    default:
      return b.createdAt - a.createdAt
  }
}
```

11. See point 10.  

12.

13.

14. Check commit in week-25 for an implementation of `fetchTodos`: commit [a1cb856](https://github.com/rdzcn/mk-todo/commit/a1cb856c8ce0e5261a27585d50bf3e5b08c57869)  

15. Passing a `{completed}` prop to TodoList to specify the title. Instead of `h1` now using `span` as it is inline element. That is, `{todos.length}` will appear next to the title.

16. Rendering completed Todos in TodoList.

# Follow up on previous weeks

1. Change the README.md. Include the tasks for each week together with links to branch deploys on Netlify to see the progress.

2. Refactor Show/Hide logic of Completed Todos. Implement conditional labelling of the button.

3. Watch https://www.youtube.com/watch?v=IcgmSRJHu_8
