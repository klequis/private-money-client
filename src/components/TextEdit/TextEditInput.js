import React, { useState } from 'react'
import classNames from 'classnames'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'

const TextEditInput = ({
  initialValue,
  name, 
  disabled,
  placeholder,
  onBlur
}) => {
  const [_touched, _setTouched] = useState(false)
  const [_value, _setValue] = useState(initialValue)

  // events
  const _handleChange = (event) => {
    green('TextEdit._handleChange', 'called')
    const { value } = event.target
    _setValue(value)
  }

  const _handleBlur = (event) => {
    _setTouched(true)
    onBlur(event)
  }

  if (_touched) {

  }
  // const _isValid = _touched ? _value.length >= 3 : true
  return (
    <input
      // id={`TextEdit-${name}`}
      type="text"
      name={name}
      value={_value}
      onChange={_handleChange}
      className={classNames('form-control', 'form-control-sm')}
      disabled={disabled}
      placeholder={placeholder}
      // style={_isValid ? { backgroundColor: 'white' } : { backgroundColor: '#e74c3c' } }
      // style={
      //   _getStyle(_touched, _isValid)
      // }
      onBlur={_handleBlur}
    />
  )
}

export default TextEditInput