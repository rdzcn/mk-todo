export function colorForDueDate(today, date) {
	const now = new Date(today)
	const dueDate = new Date(date)
	const nowDay = now.getDate()
	const nowMonth = now.getMonth()
	const nowYear = now.getFullYear()
	const dueDateDay = dueDate.getDate()
	const dueDateMonth = dueDate.getMonth()
	const dueDateYear = dueDate.getFullYear()
  
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

export function generateCalender() {
	const todos = {};
	const dates = [];
	const currentDay = new Date().getDate();
	for (let i = 0; i < 31 ; ++i) {
		const today = new Date();
		dates[i] = new Date(today.setDate(currentDay + i)).toISOString().substr(0, 10);
      	const x = dates[i];
      	todos[x] = []
	}
	return todos
}
