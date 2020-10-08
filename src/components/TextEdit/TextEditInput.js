import React, { useState } from 'react'
import classNames from 'classnames'

const TextEditInput = ({ value, name, disabled, placeholder, handleBlur }) => {

    const [_touched, _setTouched] = useState(false)
    const [_value, _setValue] = useState(value)

    // events
    const _handleChange = (event) => {
        const { value } = event.target
        _setValue(value)
    }

    const _handleBlur = (event) => {
        const { name, value } = event.target
        const { type: eventType } = event
        // green('onBlur')
        _setTouched(true)
        handleBlur(name, value, eventType)
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