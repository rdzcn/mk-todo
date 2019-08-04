import React from 'react'

const ShowCompletedToggler = ({ state, children }) => {

  return (
    <div>
      <button type="button" onClick={state.toggleShowCompleted}>
        {state.data.showCompleted ? 'Hide' : 'Show'}
      </button>
      {state.data.showCompleted ? {...children} : null}
    </div>
  )
}

export default ShowCompletedToggler
