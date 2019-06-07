let startTime = []
let endTime = []
let text = ''

export const getStartTime = () => {
  startTime.splice(1, 1, Date.now())
}

export const getEndTime = () => {
  endTime.push(Date.now())
}

export const getTitle = (title) => {
  text = title.replace(/(^\w{2}).*(\w{2})/, '$1-$2')
}

export const createUID = () => {
  const uid = `${startTime[1] - startTime[0]}-${text}-${endTime}`
  return uid
}
