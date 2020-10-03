import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf } from 'logger'

const Wrapper = styled.div`
  background-color: blue;
`

const ErrorLabel = styled.label`
  background-color: green; 
  border: 1px solid white;
  width: 100%;
`

const TextEdit = ({
  disabled,
  onBlur,
  // maxWidth = null,
  minChars = 0,
  // minWidth = null,
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
    <Wrapper>

      <div>
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

      <ErrorLabel>
        <label
          style={
            _isValid ? { visibility: 'hidden' } : { visibility: 'visible' }
          }
        >
          Minimum 3 characters
        </label>
      </ErrorLabel>
    </Wrapper>
  )
}

export default TextEdit
