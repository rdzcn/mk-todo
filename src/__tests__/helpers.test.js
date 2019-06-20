import { colorForDueDate } from "../utils/helpers"

const today = new Date(2019, 5, 18, 16)        
const dueDateToday = new Date(2019, 5, 18, 10)    
const dueDateTomorrow = new Date(2019, 5, 19, 12)   
const dueDateYesterday = new Date(2019, 5, 17, 12)

const nullDate = null
const stringDate = "2019-06-18"

test("Due Date in the future returns #00f", () => {
	expect(colorForDueDate(today, dueDateTomorrow)).toBe("#00f")
})

test("Due Date on today returns #0f0", () => {
	expect(colorForDueDate(today, dueDateToday)).toBe("#0f0")
})

test("Due date in the past returns #f00", () => {
	expect(colorForDueDate(today, dueDateYesterday)).toBe("#f00")
})

test("Due date has to be date.Object and null or string", () => {
	expect(() => {colorForDueDate(today, nullDate)}).toThrow()
	expect(() => {colorForDueDate(today, stringDate)}).toThrow()
	expect(() => {colorForDueDate(nullDate, dueDateToday)}).toThrow()
	expect(() => {colorForDueDate(stringDate, dueDateToday)}).toThrow()
})
