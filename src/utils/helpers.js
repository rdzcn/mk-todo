export function	colorForDueDate(today, date) {
	const dueDate = new Date(date)
	dueDate.setHours(23, 59, 59, 999)
	if (dueDate.valueOf() - today.valueOf() < 24 * 60 * 60 * 1000 && dueDate.valueOf() > today.valueOf()) {
		return "green"
	} else if (dueDate.valueOf() > today.valueOf()) {
		return "blue"
	} else { 
		return "red"
	}
}