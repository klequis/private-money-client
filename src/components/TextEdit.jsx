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

const _getStyle = (touched, isValid) => {
  // console.group('**')
  // green('touched', touched)
  // green('isValid', isValid)
  // console.groupEnd()
  if (touched && !isValid) {
    return { backgroundColor: '#e74c3c', color: 'white' }
  } 
  return { backgroundColor: '#fff', color: '#444' }
}

const TextEdit = ({
  disabled,
  onBlur: passedOnBlur,
  labelText,
  minChars = 0,
  name,
  placeholder = '',
  value = ''
}) => {
  const [_touched, _setTouched] = useState((x) => {
    console.log('_setTouched: x', x)

    return false
  })
  const [_value, _setValue] = useState(value)

  const _handleChange = (event) => {
    const { value } = event.target
    _setValue(value)
  }

  const _handleBlur = (event) => {
    const { name, value } = event.target
    const { type: eventType } = event
    green('onBlur')
    _setTouched(true)
    // passedOnBlur(name, valule, eventType)
  }
  green('_touched', _touched)
  const _isValid = _touched ? _value.length < minChars : true
  
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
          style={ _isValid ? { backgroundColor: 'red' } : {}}
          style={
            _getStyle(_touched, _isValid)
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
