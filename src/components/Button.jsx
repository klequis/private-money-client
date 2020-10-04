import React from 'react'
import classNames from 'classnames'

const buttonExtraSml = {
  paddingTop: 3,
  paddingBottom: 3,
  fontSize: '0.675rem',
}
const Button = ({ onClick, children }) => {
  // style={buttonExtraSml}
  return (
    <button className={classNames('btn', 'btn-info', 'btn-sm')}  onClick={onClick}>
      {children}
    </button>
  )
}

export default Button