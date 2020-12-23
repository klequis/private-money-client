import React, { useState } from 'react'
import styled from 'styled-components'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'

// eslint-disable-next-line
import { green, redf } from 'logger'

const CheckBoxDiv = styled.div`
  background-color: blue;
  margin-right: .25rem;
`

export const CheckBox = ({
  checked,
  disabled,
  id,
  labelText,
  name,
  onChange,
}) => {

  const [_checked, _setChecked] = useState(checked)

  const _onChange = (event) => {
    _setChecked(event.target.checked)
    onChange(event)
  }

  return <CheckBoxDiv className="form-check">
    {
      isNilOrEmpty(labelText)
        ? (
          <input
            className="form-check-input"
            checked={_checked}
            disabled={disabled}
            id={id}
            name={name}
            onChange={_onChange}
            type="checkbox"
          />
        )
        : (
          <label
            className="form-check-label"
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

            {labelText}
          </label>
        )
    }
  </CheckBoxDiv>
}

