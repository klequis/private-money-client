import React from 'react'
import BsButton from 'react-bootstrap/Button'

const buttonExtraSml = {
  paddingTop: 3,
  paddingBottom: 3,
  fontSize: '0.675rem',
}
const Button = ({ onClick, children }) => {
  return (
    <BsButton style={buttonExtraSml} variant="primary" onClick={onClick}>
      {children}
    </BsButton>
  )
}

export default Button