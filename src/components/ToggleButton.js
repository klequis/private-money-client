import React from 'react'

// eslint-disable-next-line
import { purple, green } from 'logger'

const getClass = (optionState) => {
  switch (optionState) {
    case 'on':
      return 'btn btn-outline-success'
    case 'off':
      return 'btn btn-outline-danger'
    case 'disabled':
      return 'btn btn-outline-secondary'
    default:
      throw new Error('ToggleButton.getClass: Invalid value for optionState')
  }
}

const getSvgData = (optionState) => {
  switch (optionState) {
    case 'on':
      return 'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z'
    case 'off':
      return 'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708l6-6z'
    case 'disabled':
      return 'M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'
    default:
      throw new Error('ToggleButton.getClass: Invalid value for optionState')
  }
}

export const ToggleButton = ({ children, optionState }) => {
  return (
    <div>
      <button type="button" class={getClass(optionState)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-check-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d={getSvgData(optionState)}></path>
        </svg>
        {children}
      </button>
    </div>
  )
}
