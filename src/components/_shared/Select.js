import React from 'react'

const Select = ({ options }) => {
  return (
    <div>
      <select>
        {
          options.map(option => {
            <option value={option.id}>{option.text}</option>
          })
        }
      </select>
    </div>
  )
}

export default Select