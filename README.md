### React Todo app with localStorage

[Result](https://angry-goldstine-203e71.netlify.com/)

#### Week 22

##### Task:

- Add a todo with an option of checking, deleting and editing. 
- Edit brings an input field and a save button.
- Can edit only one item at a time. 
- Checkbox stays checked and causes the text in the todo item to be crossed out.
- Unchecking the checkbox removes crossed out text.
- Todo items will be stored as a single JSON object in localStorage.
- No styling done. 

##### Steps:

1. Start with App component. It has a state with “title” and “todos” array with “todo” objects. It renders a form with an input field and submit button. Input field has a value attribute, which is linked to state.title and an onChange attribute which captures the text typed in as title and simultaneously saves it into state.title. State.title then defines value of the input field. So it is circular in a sense that what user types in feeds the state and state feeds the value. When user clicks the button we submit the form. The form element has a onSubmit attribute. It creates a todo object with title, id, completed and editable attributes and saves it into the state and the localStorage. Title is the task to do, id is a unique identifier, completed and editable are set to false. 

2. We can display these todos as list items. Since the todos is an array we can use map() to iterate through each todo. 

3. Add a checkbox to each todo with checked={item.completed} which is false by default. Add an event handler which toggles the completed. ~~To do this first we need the index of the item. We have access to the index through the “name” attribute of the checkbox.~~ We use the ID and iterate through todos to find the specific todo item, we toggle completed and then we save this to state. State updates then the checked status of the todo. Again a ~~circular~~ unidirectional flow. Event handler changes state and state changes the value of the attribute. 

4. Add a delete button. When clicked it removes the item from the array. 

5. Add an edit button. Only one todo should be editable at a time. Add a global attribute isEditing to the state. By default it is false. When user clicks edit, it will first check if isEditing is true or false. First, if it is false, it will set it to true. It will also toggle the “editable” attribute of the todo. Second, if it is true, it will do nothing. That means, user is clicking a second item to edit, which is not allowed. This change in state will change the view. For the todo, whose edit button is clicked, its title, checkbox, edit and delete buttons will disappear and instead an input field and a save button will appear. Input field should have value={item.title} and not value={this.state.title} because state.title is empty. This input field will work like the add-todo form. There this circular flow worked through the state.title. We cannot do that this time because it is a global attribute and will interfere with other input fields. We add editTitle to the state, which takes the value of {item.title} when edit is clicked. Typing in (onChange) updates editTitle and editTitle updates value. Clicking save button will update the todos array and set the new state. 

6. Clicking edit will change the view. We need conditional rendering. If state.isEditing and item.editable are true, then we show an input+save. Else we show title+checkbox+edit+delete. 

7. Use componentDidMount to fetch any data stored in the localStorage and populate state.todos. 

8. Add-a-todo button saves the entry to the localStorage. When we save it to the localStorage we need to use JSON.stringify to save it as a JSON object. When we retrieve the data we need to use JSON.parse to use it as a JS object in the app. 

9. Instead of saving after each check or edit or delete we could use componentWillUnmount to capture the state and save it to localStorage. However, componentWillUnmount does not fire when the window is closed or page is reloaded. We set an event listener on the window, “beforeunload” with componentDidMount and remove it when component unmounts. Event listener callback function is bound to the App component, which saves all the data to localStorage. If App component unmounts on its own, then we remove the event listener and save all the data to the localStorage. This second saveToLocal is called on Window and not bound to the App component. (this.saveToLocal() and not this.saveToLocal.bind(this))

10. Deploy to Netlify. Open an account, link Github and link the repository to continuous deployment. Git push to the repo will trigger deploy. 

11. To have a unique id for each todo, save a key called id in the localStorage. This increases by one whenever a new todo is added. After deleting all 7 todos, for instance, a newly added to do will not have the id: 1 but id: 8. 

#### Week 23

##### Task: 
