import React from 'react'
 
const ShowCompletedToggler = ({ repo }) => {
  
  return(
    <button type="button" onClick={repo.toggleShowCompleted}>
      {repo.showCompleted ? 'Hide' : 'Show'}
    </button>
  )
}

export default ShowCompletedToggler