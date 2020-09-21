import React, { useEffect, useState } from 'react'

// eslint-disable-next-line
import { green, redf } from 'logger'
import { props } from 'ramda'

const tmp = `
  height: calc(1.5em + 0.35rem + 2px);
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0;
  font-size: 0.675rem;
  &is-invalid {
    background-color: red;
  }
`

const makeStyle = (maxWidth, minWidth) => {
  const max = maxWidth ? { maxWidth } : {}
  const min = minWidth ? { minWidth } : {}
  return { ...max, ...min }
}

const TextEdit = ({
  disabled,
  onBlur,
  maxWidth = null,
  minChars = 0,
  minWidth = null,
  name,
  placeholder = '',
  value = ''
}) => {
  const [_isValid, _setIsValid] = useState(true)
  const [_touched, _setTouched] = useState(false)
  const [_value, _setValue] = useState(value)
  const [_isMinLength, _setIsMinLength] = useState(true)

  const _handleChange = (event) => {
    const { value } = event.target
    _setValue(value)
    _setIsMinLength(value.length >= minChars)
  }

  const _handleBlur = (event) => {
    const { value } = event.target
    _setIsMinLength(value.length >= minChars)
    _setTouched(true)
    onBlur(event)
  }

  useEffect(() => {
    _setIsValid(_touched ? _isMinLength : true)
  }, [_setIsValid, _touched, _isMinLength])

  return (
    <>

      <div  style={{ backgroundColor: 'blue' }}>
        <input
          type="text"
          name={name}
          value={_value}
          onChange={_handleChange}
          className="form-control form-control-sm"
          disabled={disabled}
          style={
            _isValid
              ? { backgroundColor: '#fff', color: '#444' }
              : { backgroundColor: '#e74c3c', color: 'white' }
          }
          onBlur={_handleBlur}
        />
      </div>

      <div style={{ backgroundColor: 'green', border: '1px solid white'  }}>
        <label
          style={
            _isValid ? { visibility: 'hidden' } : { visibility: 'visible' }
          }
        >
          Minimum 3 characters
        </label>
      </div>
    </>
  )
}

export default TextEdit
