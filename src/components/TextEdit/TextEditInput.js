import React, { useState } from 'react'
import PropTypes from 'prop-types'
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
        className={classNames(['form-control', 'form-control-sm'])}
        disabled={disabled}
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