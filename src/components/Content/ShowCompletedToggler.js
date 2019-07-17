import React from 'react'

const ShowCompletedToggler = ({ repo, children }) => {

  return (
    <div>
      <button type="button" onClick={repo.toggleShowCompleted}>
        {repo.data.showCompleted ? 'Hide' : 'Show'}
      </button>
      {repo.data.showCompleted ? {...children} : null}
    </div>
  )
}

export default ShowCompletedToggler
