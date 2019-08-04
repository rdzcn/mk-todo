# Current structure of the App

## Outside the React scope  

1. We have four classes  

  - **PersistentStorage**: It interacts with `LocalStorage` and `State`. It has `read()` and `write()` methods.   
  - **TemporaryStorage**: It interacts with `mockData`. It has `read()` and `write()` methods. It is used in tests.
  - **Router**: It gets information about the changes in URL, updates its `pathname` and accordingly selects the route. `Router.route` decides on what to display eventually.
  - **State**: It has user data from `LocalStorage`. It contains all the actions for user to change data. It updates `LocalStorage` when data is changed.  

2. Database is LocalStorage

  - It has the following default data structure:

  ```
  data: {
    showCompleted: false,
    categories: ['My Todos', 'Home Related', 'Work Related', 'Groceries'],
    todos: [] 
  }
  ```
  - Each todo item is an `Object` within `todos` array.

## Inside the React scope

1. **`index.js`** 

  - It creates an instance of `PersistentStorage`, `persistentStorage`.
  - It creates an instance of `State`, `state` with `persistentStorage`.
  - It creates an instance of `Router`, `router` with `persistentStorage`. 
  - It renders `App` with `router` and `state` as its props. 
  - `state` and `router` listen to changes in their instance variables. When they catch a change, they re-render `App` as a callback. 

2. **App**

  - It renders two components in a two-column format: `Sidebar` and `Content`. 
  - `Sidebar` shows a list of categories of todo items. These categories can be renamed or deleted. Clicking category names will change the URL. Pathname becomes the category name. Here `router` updates `route`.   
  - `Sidebar` also has a button to search within todo item titles. Clicking `search` button will change the URL. Here `router` updates `route`. 
  - `Sidebar` makes it possible to add a new category.  
  - `Content` toggles between `search` view or `content` view, depending on the URL. 

3. **App -> Sidebar**

  - It renders three components: `Search`, `CategoryList` and `NewCategory`.  
  - `Search` starts with a search button. Clicking the search button, changes the URL to "/search" and brings an `input` field.  
  - `CategoryList` renders a list of categories with each item as `Category` components. If a `Category` is in editing mode, then `EditingCategory` is rendered instead.  
  - `NewCategory` makes it possible to add a new category. 

4. **App -> Sidebar -> Search**

  - User search input is captured in the URL, after `?`. `router` doesn't update `route` but its `pathname`.
  - When `Search` is active, `SearchResults` is rendered in the right column.  

5. **App -> Sidebar -> CategoryList**

  - Clicking a category changes the URL. This causes `MainSection` in the right column to render todo items within that category. 

6. **App -> Sidebar -> NewCategory**  

  - It has its own state to capture user input. 

7. **App -> Content**

  - It renders either `SearchResults` **or** `MainSection` component. This decision is based on the URL, set by `Sidebar -> Search` component. 
  - `SearchResults` renders a list of todo items with each item as `Todo` or `EditingTodo` component. In this sense each item is editable. 
  - `SearchResults` gets the search term from the URL and accordingly displays the relevant todo items. It has also a `Reset Search` button which resets the search input. 
  - `MainSection` is rendered if `route` is not "search" and pathname is within `state.data.categories`.  

8. **App -> Content -> SearchResults**

  - This is the list of search results. Each todo item displayed can be edited on the spot. 

9. **App -> Content -> MainSection**

  - It renders three components: `NewTodo`, `TodoList` and `ShowCompletedToggler`.
  - `NewTodo` makes it possible to add a new todo.  
  - `TodoList` renders a list of todo items with each item as a `Todo` component. If a `Todo` is in editing mode, then `EditingTodo` is rendered instead. 
  - `ShowCompletedToggler` renders a `TodoList` with only completed todo items, if Show button is clicked. `ShowCompletedToggler` renders `TodoList` as `props.children`. 

10. **App -> Content -> MainSection -> NewTodo**

  - New todo item has to have a title but can be created without due date. It gets its category value from the URL. It has its own state to capture the changes in title input or due date input. Default category is "My Todos" as "/" renders category "My Todos".  

11. **App -> Content -> MainSection -> TodoList**

  - `TodoList` displays completed or uncompleted todos, depending on the filter passed from `MainSection`. 

12. **App -> Content -> MainSection -> ShowCompletedToggler**

  - It decides whether to render another `TodoList` with completed todos. 