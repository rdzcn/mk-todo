import React from 'react'

const DueDate = props => {
  
  return (
    <input 
      type="date" 
      value={props.value} 
      onChange={props.handleDueDateChange} 
    />
  )
}

export default DueDate