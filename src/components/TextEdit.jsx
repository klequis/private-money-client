import React, { useEffect, useState } from 'react'
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
  // border: 1px solid white;
  width: 100%;
  
`

const TextEdit = ({
  disabled,
  onBlur,
  labelText,
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
  const [_isMinChars, _setIsMinChars] = useState(true)

  const _handleChange = (event) => {
    const { value } = event.target
    _setValue(value)
    _setIsMinChars(value.length >= minChars)
  }

  const _handleBlur = (event) => {
    const { value } = event.target
    _setIsMinChars(value.length >= minChars)
    _setTouched(true)
    onBlur(event)
  }

  useEffect(() => {
    green('_isValue', _isValid)
    green('_touched', _touched)
    green('_value', _value)
    green('_isMinChars', _isMinChars)
    _setIsValid(_touched ? _isMinChars : true)
  }, [_setIsValid, _touched, _isMinChars])
  /*
  <div class="form-group">
    <fieldset disabled="">
      <label class="control-label" for="disabledInput">Disabled input</label>
      <input 
        class="form-control" 
        id="disabledInput" 
        type="text" 
        placeholder="Disabled input here..." 
        disabled=""
      >
    </fieldset>
  </div>
  
  */
  return (
    <Wrapper>
      <div class="form-group">
        <label
          class="col-form-label col-form-label-sm"
          for={`TextEdit-${name}`}>{labelText}</label>
        <input
          id={`TextEdit-${name}`}
          type="text"
          name={name}
          value={_value}
          onChange={_handleChange}
          className={classNames('form-control', 'form-control-sm')}
          disabled={disabled}
          style={
            _isValid
              ? { backgroundColor: '#fff', color: '#444' }
              : { backgroundColor: '#e74c3c', color: 'white' }
          }
          onBlur={_handleBlur}
        />
        <ErrorLabel>
          <label
            style={
              _isValid ? { visibility: 'hidden' } : { visibility: 'visible' }
            }
          >
            Minimum 3 characters
          </label>
        </ErrorLabel>
      </div>
    </Wrapper>
  )
}

export default TextEdit
