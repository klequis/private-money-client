import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'

const TextInput = styled.input`
  max-width: ${props => props.maxWidth === 'none' ? 'none' : props.maxWidth + 'px'}
`

const TextEditInput = ({
  disabled,
  initialValue,
  maxWidth = 'none',
  name,
  onBlur,
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
  return (
    <div>
      <TextInput
        className={classNames(['form-control', 'form-control-sm'])}
        disabled={disabled}
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

export default TextEditInput

TextEditInput.propTypes = {
  disabled: PropTypes.bool.isRequired
}