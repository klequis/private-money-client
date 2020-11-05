import React, { useState } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'

const Input = styled.input`
  border: 1px solid #222;
  background-clip: padding-box;
  background-color: #fff;
  border-radius: 0.2rem;
  color: #444;
  font-size: 0.8203125rem;
  font-weight: 400;

  height: calc(1.5em + 0.5rem + 2px);
  line-height: 1.5;
  padding: 0.25rem 0.5rem;
  transition: border-coloheight: calc(1.5em + 0.5rem + 2px);
  -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  width: 100% ;
  &:disabled {
    background-color: rgba(175, 175, 175, 1);
    // background-color: green;
    opacity: 1;
  }
`

/*
  display: block;
  border-radius: 0.2rem;
  
  @media (prefers-reduced-motion: reduce) {
    -webkit-transition: none;
    transition: none;
  }
  
  &:focus {
    color: #444;
    background-color: #fff;
    border-color: #739ac2;
    outline: 0;
    -webkit-box-shadow: 0 0 0 0.2rem rgba(55, 90, 127, 0.25);
            box-shadow: 0 0 0 0.2rem rgba(55, 90, 127, 0.25);
  }
  
  
  
*/
// background-color: rgba(255, 255, 255, 0);
// color: #888;

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
    <Input
      // className="form-control form-control-sm"
      type="text"
      name={name}
      value={_value}
      onChange={_handleChange}
      disabled={disabled}

      placeholder={placeholder}
      onBlur={_handleBlur}
    />
  )
}

export default TextEditInput


const x = `
.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.5;
  color: #444;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #222;
  border-radius: 0.25rem;
  -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .form-control {
    -webkit-transition: none;
    transition: none;
  }
}

.form-control::-ms-expand {
  background-color: transparent;
  border: 0;
}

.form-control:-moz-focusring {
  color: transparent;
  text-shadow: 0 0 0 #444;
}

.form-control:focus {
  color: #444;
  background-color: #fff;
  border-color: #739ac2;
  outline: 0;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(55, 90, 127, 0.25);
          box-shadow: 0 0 0 0.2rem rgba(55, 90, 127, 0.25);
}

.form-control::-webkit-input-placeholder {
  color: #888;
  opacity: 1;
}

.form-control::-ms-input-placeholder {
  color: #888;
  opacity: 1;
}

.form-control::placeholder {
  color: #888;
  opacity: 1;
}

.form-control:disabled, .form-control[readonly] {
  background-color: #ebebeb;
  opacity: 1;
}


/////////////////////////////

////////////////////////////////

input[type="date"].form-control,
input[type="time"].form-control,
input[type="datetime-local"].form-control,
input[type="month"].form-control {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
}

select.form-control:focus::-ms-value {
  color: #444;
  background-color: #fff;
}

.form-control-file,
.form-control-range {
  display: block;
  width: 100%;
}


`

const sm = `
.form-control-sm {
  height: calc(1.5em + 0.5rem + 2px);
  padding: 0.25rem 0.5rem;
  font-size: 0.8203125rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}
`