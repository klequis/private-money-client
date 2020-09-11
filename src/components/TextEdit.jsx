import React from 'react'
import Form from 'react-bootstrap/Form'

const textExtraSm = {
  height: 'calc(1.5em + 0.4rem + 2px)',
  paddingTop: 0,
  paddingBottom: 0,
  paddingRight: 0,
  fontSize: '0.675rem'
}

const makeStyle = (maxWidth, minWidth, textStyle) => {
  const max = maxWidth ? { maxWidth } : {}
  const min = minWidth ? { minWidth } : {}
  return { ...textStyle, ...max, ...min }
}

const TextEdit = ({
  name,
  value,
  onChange,
  placeholder = '',
  maxWidth = null,
  minWidth = null,
  disabled
}) => {
  const style = makeStyle(maxWidth, minWidth, textExtraSm)

  return (
    <Form.Control
      style={style}
      type="text"
      name={name}
      value={value}
      custom
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}

export default TextEdit
