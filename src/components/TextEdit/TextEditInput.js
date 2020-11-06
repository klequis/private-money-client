import React, { useState } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'

const TextEditInput = ({
  caller,
  initialValue,
  name,
  disabled,
  placeholder,
  onBlur
}) => {
  const [_touched, _setTouched] = useState(false)
  const [_value, _setValue] = useState(initialValue)

  green(`TextEditInput: disabled (${caller}: ${name})`, disabled)

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
      <input
        type="text"
        name={name}
        value={_value}
        onChange={_handleChange}
        disabled={disabled}
        placeholder={placeholder}
        onBlur={_handleBlur}
      />
    </div>
  )
}

export default TextEditInput

TextEditInput.propTypes = {
  disabled: PropTypes.bool.isRequired
}