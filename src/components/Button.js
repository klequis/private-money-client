import React from 'react'
import classNames from 'classnames'

// const buttonExtraSml = {
//   paddingTop: 3,
//   paddingBottom: 3,
//   fontSize: '0.675rem',
// }
const Button = ({ children, className, disabled, onClick }) => {
  // style={buttonExtraSml}
  return (
    <button className={classNames('btn', 'btn-info', 'btn-sm', className)}  onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button