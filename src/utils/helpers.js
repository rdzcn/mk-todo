export function colorForDueDate(today, date) {
  const now = new Date(today)
  const dueDate = new Date(date)
  
  const [nowDay, nowMonth, nowYear] = [now.getDate(), now.getMonth(), now.getFullYear()]
  const [dueDateDay, dueDateMonth, dueDateYear] = [dueDate.getDate(), dueDate.getMonth(), dueDate.getFullYear()]

  if (isNaN(Date.parse(now)) || isNaN(Date.parse(dueDate))
  ) {
    return null
  } if ((dueDateYear > nowYear) || 
         (dueDateYear === nowYear && dueDateMonth > nowMonth) ||
           (dueDateYear === nowYear && dueDateMonth === nowMonth && dueDateDay > nowDay)
  ) {
    return '#00f'
  } if (dueDateYear === nowYear &&
          dueDateMonth === nowMonth &&
            dueDateDay === nowDay
  ) {
    return '#0f0'
  } 
  return '#f00'
}

