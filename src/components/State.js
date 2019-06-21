import uuid from "uuid/v4"

class State {
	constructor() {
		const data = JSON.parse(localStorage.getItem("data")) || {}
		this.todos = data.todos || []
		this.showCompleted = data.showCompleted || false
		this.editingID = null 
	}

	persist() {
		const data = {}
		data.todos = this.todos
		data.showCompleted = this.showCompleted
		localStorage.setItem("data", JSON.stringify(data))
	}

	addTodo(title, dueDate) {
		const todo = {
			title: title,
			completed: false,
			id: uuid(),
			createdAt: Date.now(),
			modifiedAt: Date.now(),
			dueDate: dueDate
		}
		this.todos = [...this.todos, todo]
		this.persist()
	}

	toggleCompletionForTodo(id) {
		this.todos.map(todo => {
			if (todo.id === id) {
				todo.completed = !todo.completed
				todo.modifiedAt = Date.now()
			}
			return todo
		})
		this.persist()
	}

	editTodo(id) {
		this.editingID ? this.editingID = null : this.editingID = id 
	}

	saveTodo(id, title) {
		this.todos.map(todo => {
			if (todo.id === id) {
				todo.title = title
			} 
			return	todo
		})
		this.persist()
		this.editingID = ""
	}

	deleteTodo(id) {
		this.todos = this.todos.filter(todo =>
			todo.id !== id
		)
		this.persist()
	}

	toggleShowCompleted = () => {
		this.showCompleted = !this.showCompleted
		this.persist()
	}

}

export default State