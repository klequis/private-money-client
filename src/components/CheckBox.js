import React, { useState } from 'react'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf } from 'logger'

const CheckBoxDiv = styled.div`
  background-color: blue;
`


export const CheckBox = ({
  checked,
  disabled,
  id,
  label,
  name,
  onChange,
}) => {

  const [_checked, _setChecked] = useState(checked)

  const _onChange = (event) => {
    _setChecked(event.target.checked)
    onChange(event)
  }

  return <CheckBoxDiv className="form-check">
    <label
      className="form-check-label"
      htmlFor={id}
    >
      <input 
        className="form-check-input"
        checked={_checked}
        disabled={disabled}
        id={id}
        name={name}
        onChange={_onChange}
        type="checkbox" 
      />

      {label}
    </label>
  </CheckBoxDiv>
}

