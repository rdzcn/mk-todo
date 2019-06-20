import uuid from "uuid/v4"

class State {
	constructor() {
		const data = JSON.parse(localStorage.getItem("data")) || {}
		this.todos = data.todos || []
		this.showCompleted = data.showCompleted || false
		this.editingID = null 
	}

	persist(todos) {
		const data = {}
		data.todos = todos
		data.showCompleted = this.showCompleted
		localStorage.setItem("data", JSON.stringify(data))
		this.todos = todos
		console.log("persist", this.todos, todos)
	}

	addTodo(title, dueDate) {
		let { todos } = this
		const todo = {
			title: title,
			completed: false,
			id: uuid(),
			createdAt: Date.now(),
			modifiedAt: Date.now(),
			dueDate: dueDate
		}
		todos = [...todos, todo]
		this.persist(todos)
	}

	toggleCompletionForTodo(id) {
		let { todos } = this
		todos.map(todo => {
			if (todo.id === id) {
				todo.completed = !todo.completed
				todo.modifiedAt = Date.now()
				return todo
			} else {
				return todo
			}
		})
		this.persist(todos)
	}

	editTodo(id) {
		this.editingID ? this.editingID = null : this.editingID = id 
	}

	saveTodo(id, title) {
		let { todos } = this
		todos.map(todo =>
			todo.id === id ?
				todo.title = title :
				todo
		)
		this.persist(todos)
		this.editingID = ""
	}

	deleteTodo(id) {
		let { todos } = this
		todos = todos.filter(todo =>
			todo.id !== id
		)
		this.persist(todos)
	}

	toggleShowCompleted = (todos) => {
		this.showCompleted = !this.showCompleted
		this.persist(todos)
	}

}

export default State