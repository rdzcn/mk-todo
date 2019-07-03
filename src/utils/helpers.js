export function colorForDueDate(today, date) {
	const now = new Date(today)
	const dueDate = new Date(date)
	const nowDay = now.getDate()
	const nowMonth = now.getMonth()
	const nowYear = now.getFullYear()
	const dueDateDay = dueDate.getDate()
	const dueDateMonth = dueDate.getMonth()
	const dueDateYear = dueDate.getFullYear()
	
	if (isNaN(nowDay) || isNaN(dueDateDay)) {
		throw "today and/or dueDate is not a date string"
	}

	if ((dueDateYear > nowYear) || 
        (dueDateYear === nowYear && dueDateMonth > nowMonth) ||
          (dueDateYear === nowYear && dueDateMonth === nowMonth && dueDateDay > nowDay)
	) {
		return "#00f"
	} if (dueDateYear === nowYear &&
              dueDateMonth === nowMonth &&
                dueDateDay === nowDay
	) {
		return "#0f0"
	} 
		return "#f00"
}

export function generateCategories() {
	const todos = {}
	const categories = ["notes", "home", "work", "groceries", "books to read", "movies to watch" ]
	for (let category of categories) {
		todos[category] = []
	}
	return todos
}
