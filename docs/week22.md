NOTES


Questions on Week 22:


1. Why do we need react-script?
To run the app in development mode or to build for production. 
2. What’s browserslist?
Polyfill?
3. Can we use relative URLs instead of %PUBLIC_URL%?
Yes.
4. Why do we need serviceWorker.unregister(); in index.js?
Switch to register() to make the app available online. Caches the assets. 
5. Do we need serviceWorker.js?
At this stage not really. 


Task: 


1. You will be working in a separate git branch the whole week. At the end of the week you will open a pull request to the master branch. I will be reviewing and leaving comments on the pull request, both for code and documentation. After the review we will merge the pull request to the master branch. [branch: week-23] [pull request on friday]


2. Be sure Netlify integration works well with the opened pull request. Netlify should post a link to the deployed application with changes from the specific pull request. [branch integration? Changed settings to deploy week-23 branch]


3. Refactor the state of your application in a way that only one todo can be theoretically edited at a time. Hint: with the current implementation, what happens if two todos have editable set to true? [only from the console, two todos can be set to isEditing: true => good enough?]


4. Research how to generate unique random IDs. Refactor the application to use them. [see helpers.js: ] For example


5. Split the components into the following ones: App, NewTodo, Todo, TodoList. [done]


6. One of the key aspects of good program design is to make sure incorrect states are impossible to represent. For example, with the following structure


state = {
    title: "",
    todos: [],
    isEditing: false,
    editTitle: "",
    id: ''
  };


I can have isEditing set to false, but editTitle set to “blah”. Please refactor your state in a way that this incorrect scenario would be impossible to obtain. [editTitle has been removed]


7. Refactor saveToLocal() to perform a single write to localStorage.[done]


8. Please use proper indentation here


    if (title) {
    const todo = {
    [moved the logic to NewTodo.handleSubmit and fixed it]


9. Is saveToLocal being invoked or referenced here?


    this.setState(
      {
        todos: todos.concat(todo),
        title: "",
        id: id + 1
      },
      this.saveToLocal
[fixed it]


10. Please remove duplication of todos[event.target.name].editable = !todos[event.target.name].editable [editable has been removed]


11. Please refactor todos[event.target.name].editable not to use a parameter from the event but from the state. [isEditable has been removed]


12. For this week’s assignment you’re still not allowed to improve the looks of the app. Plain HTML components.


13. Please add a header “My Todos” with a counter of uncompleted todos: “My Todos (3)" [done]


14. Please add a “Completed” section to your todo list. When an item is completed, it should disappear from the main list of todos and appear under the “Completed" section. It should also have a counter: “Completed (2)”. [created 2 new components: CompletedTodoList and CompletedTodo]


15. Please add a “Show/Hide” toggle next to the “Completed” section. It should show and hide the completed items. [done]


16. Please sort the items in the Completed section by the completion date. The latest completed items should be higher on the list. [done]


17. Please replace the bullet points of the todo items with their checkboxes. Checkbox should be in the front now. [used tiny bit of css, list-style:none]




18. Please implement reordering of the uncompleted todo items without using any libraries.


First thoughts:


* Open a new branch and figure out Netlify. 
* Fix the editing. Remove todo.editable property. Implement using only isEditing and title. I was using the editable property so that state.todos would re-render when I made changes. Need to figure out a different way. 
* Separate into components. NewTodo, TodoList, Todo
* Read into UUID. 
* Fix localStorage
* Do not use the index but id. 
* Need to filter the state for completed and uncompleted todos. 
* Maybe another component for CompletedTodos. 
* Conditional rendering for Show/Hide for completed todos.
* Need to have a todo.modifiedAt property. 
* Use JS sort(). 


How the code works - Implementation steps


1. Open a new branch “week-23” and figured out how to add a github branch to Netlify. Then the branch is available at [branchName]--[url]
2. I started refactoring code by creating new components and distributing the app logic into these. However, this was confusing. At the end I went over the steps in Week 22 to rebuild the app almost from scratch. (with many copy-pasting)
3. First, NewTodo. It will have the form logic. Add state with title. Capture the changes in the title with submit and send it to App so that the todo is created and added to state.todos. Reset title to empty string.  
4. Second, TodoList. It is a container which hosts individual Todo items. It will take the props from App and forward them to Todo. It is basically a container. 
5. Third, Todo. It is individual items but they have to appear in different ways according to certain conditions. For example, if Edit is clicked its view should change to form input. It should have state.title so that it works like NewTodo component. However, input.value shouldn’t be blank this time but take todo.title as value. Click Edit -> set Todo.state.title to todo.title -> check if App.state.idEditing is true -> if no, then set Todo.state.isEditing to true (if yes, return) -> set App.state.isEditing to true. Idea is when isEditing = true, we will conditionally render input + save. This way Todo item will re-render. After we finish editing, we submit the input -> we send the input value and the id to App -> set Todo.isEditing to false -> App iterates through todos and when the id’s match it changes the title. 
6. Initialize the App.state.todos with data in localStorage in the constructor(). Remove componentDidMount. Remove addEventListener(“beforeunload”) and saveToLocal after each delete, edit, complete. 
7. Generate two new components CompletedTodoList and CompletedTodo. We need a trigger for Show/Hide. Add App.state.showCompleted with default ‘false’. When it is false, it will show only a button with text Show. When it is set to true,  it will show the completed todos and a button with text Hide. 
8. Use filter() to get uncompleted and completed todos and pass them to relevant components. Use todos/completedTodos.length to display the number. 
9. To order the completed todos with respect to modification date we add two new properties to todos: createdAt and modifiedAt. When a todo is created both have the same value. When a todo is completed, we map() through the array and complete the todo. We will also set modifiedAt to Date.now() to capture the modification time. (here I couldn’t manage to combine both in one. So I run map() twice). Then sort the completed todos in completedTodoList container.
10. Last but not least is the UID. Using Date.now() might generate the same ID for two users if they would click submit at the exact same moment. Adding Math.random() to it might decrease the chance but still they could be the same as well. We need to use user-specific actions or properties. Use helpers in the App to generate a UID. We record:
* Time when user starts typing to create a new todo. s[0]
* Time when user stops typing. s[1]
* Time when user submits the input. t
* We get the first two letters and last two letters of the input. text
* Template literal: {s[1] - s[0]}-text-t
