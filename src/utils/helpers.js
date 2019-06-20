export function colorForDueDate(today, dueDate) {
	const todayDay = today.getDate()
	const todayMonth = today.getMonth()
	const todayYear = today.getFullYear()
	const dueDateDay = dueDate.getDate()
	const dueDateMonth = dueDate.getMonth()
	const dueDateYear = dueDate.getFullYear()
  
	if ((dueDateYear > todayYear) || 
        (dueDateYear === todayYear && dueDateMonth > todayMonth) ||
          (dueDateYear === todayYear && dueDateMonth === todayMonth && dueDateDay > todayDay)
	) {
		return "#00f"
	} else if (dueDateYear === todayYear &&
              dueDateMonth === todayMonth &&
                dueDateDay === todayDay
	) {
		return "#0f0"
	} else {
		return "#f00"
	}
}

