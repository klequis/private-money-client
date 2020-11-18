import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styled from 'styled-components'
// import { errorLevels } from 'globalConstants'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'
import * as R from 'ramda'

const TextInput = styled.input`
  max-width: ${props => props.maxWidth === 'none' ? 'none' : props.maxWidth + 'px'};
  background-color: ${({ errorLevel }) => errorLevel.color};
`

export const TextEditInput = ({
  disabled,
  errorLevel,
  initialValue,
  maxWidth = 'none',
  // minChars,
  name,
  onBlur,
  onChange,
  placeholder,
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
  if (R.type(onChange) !== 'Function') {
    green(`TextEditInput (${name}): onChange`, onChange)
  }
  

  return (
    <div>
      <TextInput
        className={classNames(['form-control', 'form-control-sm'])}
        disabled={disabled}
        errorLevel={errorLevel}
        maxWidth={maxWidth}
        name={name}
        onBlur={_handleBlur}
        onChange={_handleChange}
        placeholder={placeholder}
        type="text"
        value={_value}
      />
    </div>
  )
}

TextEditInput.propTypes = {
  disabled: PropTypes.bool.isRequired,
  errorLevel: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }),
  initialValue: PropTypes.any,
  maxWidth: PropTypes.number,
  minChars: PropTypes.number,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}
