import uuid from "uuid/v4"

class State {
	constructor() {
		const data = JSON.parse(localStorage.getItem("data")) || {}
		this.todos = data.todos || []
		this._showCompleted = data.showCompleted || false
		this.editingID = "" 
	}

	get showCompleted() {
		return this._showCompleted
	}

	set showCompleted(value) {
		this._showCompleted = value
	}

	saveToLocal(todos) {
		const data = {}
		data.todos = todos
		data.showCompleted = this.showCompleted
		localStorage.setItem("data", JSON.stringify(data))
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
		this.saveToLocal(todos)
	}

	completeTodo(id) {
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
		this.saveToLocal(todos)
	}

	editTodo(id) {
		this.editingID = id
	}

	saveTodo(id, title) {
		let { todos } = this
		todos.map(todo =>
			todo.id === id ?
				todo.title = title :
				todo
		)
		this.saveToLocal(todos)
		this.editingID = ""
	}

	deleteTodo(id) {
		let { todos } = this
		todos = todos.filter(todo =>
			todo.id !== id
		)
		this.saveToLocal(todos)
	}

}

export default State