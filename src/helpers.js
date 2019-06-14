export function decideDueDateColor(date) {
	const dueDate = new Date(date)
	dueDate.setHours(23, 59, 59, 999)
	const now = new Date()
	if (dueDate.valueOf() - now.valueOf() < 24 * 60 * 60 * 1000) {
		return "green"
	} else if (dueDate.valueOf() > now.valueOf()) {
		return "blue"
	} else {
		return "red"
	}
}