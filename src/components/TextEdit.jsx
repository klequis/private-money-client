import React, { useState } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

// eslint-disable-next-line
import { green, redf } from 'logger'

const Wrapper = styled.div`
  width: 100%;  
`
// background-color: blue;

const ErrorLabel = styled.label`
  background-color: green; 
  width: 100%;
`

const TextEdit = ({
  disabled,
  onBlur,
  labelText,
  minChars = 0,
  name,
  placeholder = '',
  value = ''
}) => {
  const [_touched, _setTouched] = useState(false)
  const [_value, _setValue] = useState(value)

  const _handleChange = (event) => {
    const { value } = event.target
    _setValue(value)
  }

  const _handleBlur = (event) => {
    _setTouched(true)
    // onBlur(event)
  }

  const _isValid = _touched && _value.length < minChars
  green('_isValid', _isValid)
  
  return (
    <Wrapper>
      <div className="form-group">
        <label
          className="col-form-label col-form-label-sm"
          htmlFor={`TextEdit-${name}`}>{labelText}</label>
        <input
          id={`TextEdit-${name}`}
          type="text"
          name={name}
          value={_value}
          onChange={_handleChange}
          className={classNames('form-control', 'form-control-sm')}
          disabled={disabled}
          placeholder={placeholder}
          style={
            _isValid
              ? { backgroundColor: '#e74c3c', color: 'white' }
              : { backgroundColor: '#fff', color: '#444' }
          }
          onBlur={_handleBlur}
        />
        <ErrorLabel>
          <label
            // style={
            //   _isValid ? { visibility: 'hidden' } : { visibility: 'visible' }
            // }
          >
            {_isValid ? 'valid' : 'not valid'}
          </label>
        </ErrorLabel>
      </div>
    </Wrapper>
  )
}
// Minimum 3 characters
export default TextEdit
