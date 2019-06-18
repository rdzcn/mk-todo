
const today = new Date(Date.parse("2019-06-18T16:00:00.000Z"))
const dueDateToday = new Date(Date.parse("2019-06-18T10:00:00.000Z"))
const dueDateTomorrow = new Date(Date.parse("2019-06-19T16:00:00.000Z"))
const dueDateYesterday = new Date(Date.parse("2019-06-17T16:00:00.000Z"))
const nullDate = null
const stringDate = "2019-06-18"

function colorForDueDate(today, dueDate) {
	const todayDay = today.getDate()
	const todayMonth = today.getMonth()
	const todayYear = today.getFullYear()
	const dueDateDay = dueDate.getDate()
	const dueDateMonth = dueDate.getMonth()
	const dueDateYear = dueDate.getFullYear()
  
	if (dueDateYear > todayYear || 
        dueDateYear === todayYear && dueDateMonth > todayMonth ||
          dueDateYear === todayYear && dueDateMonth === todayMonth && dueDateDay > todayDay
	) {
		return "blue"
	} else if (dueDateYear === todayYear &&
              dueDateMonth === todayMonth &&
                dueDateDay === todayDay
	) {
		return "green"
	} else {
		return "red"
	}
}

test("Due Date in the future returns red", () => {
	expect(colorForDueDate(today, dueDateTomorrow)).toBe("blue")
})

test("Due Date on today returns green", () => {
	expect(colorForDueDate(today, dueDateToday)).toBe("green")
})

test("Due date in the past returns red", () => {
	expect(colorForDueDate(today, dueDateYesterday)).toBe("red")
})

test("Due date has to be date.Object and null or string", () => {
	expect(() => {colorForDueDate(today, nullDate)}).toThrow()
	expect(() => {colorForDueDate(today, stringDate)}).toThrow()
	expect(() => {colorForDueDate(nullDate, dueDateToday)}).toThrow()
	expect(() => {colorForDueDate(stringDate, dueDateToday)}).toThrow()
})
