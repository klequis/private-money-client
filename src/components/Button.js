import React from 'react'
import classNames from 'classnames'

// const buttonExtraSml = {
//   paddingTop: 3,
//   paddingBottom: 3,
//   fontSize: '0.675rem',
// }
const Button = ({ onClick, children, disabled }) => {
  // style={buttonExtraSml}
  return (
    <button className={classNames('btn', 'btn-info', 'btn-sm')}  onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button