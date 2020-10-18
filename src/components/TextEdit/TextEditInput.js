import React, { useState } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'

const Input = styled.input`
  width: 100%;
`

const TextEditInput = ({
  initialValue,
  name, 
  disabled,
  placeholder,
  onBlur
}) => {
  const [_touched, _setTouched] = useState(false)
  const [_value, _setValue] = useState(initialValue)

  const _handleChange = (event) => {
    const { value } = event.target
    _setValue(value)
  }

  const _handleBlur = (event) => {
    _setTouched(true)
    onBlur(event)
  }

  if (_touched) {

  }
  return (
    <Input
      className="form-control form-control-sm"
      type="text"
      name={name}
      value={_value}
      onChange={_handleChange}
      disabled={disabled}
      placeholder={placeholder}
      onBlur={_handleBlur}
    />
  )
}

export default TextEditInput