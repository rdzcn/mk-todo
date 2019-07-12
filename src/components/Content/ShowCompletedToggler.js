import React from 'react'
 
const ShowCompletedToggler = props => {
  
  return (
    <div>
      <button type="button" onClick={props.repo.toggleShowCompleted}>
        {props.repo.data.showCompleted ? 'Hide' : 'Show'}
      </button>
      {props.repo.data.showCompleted ? {...props.children} : null}
    </div>
  )
}

export default ShowCompletedToggler