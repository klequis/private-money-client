import React from 'react'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import styled from 'styled-components'

// eslint-disable-next-line
import { green } from 'logger'

const RadioWrapper = styled.div`
  width: ${({ width }) => isNilOrEmpty(width) ? 'auto' : `${width}px`};
`


export const Radio = ({
  disabled,
  id,
  label,
  name,
  value,
  onChange,
  groupValue,
  width = null
}) => {

  const _change = (event) => {
    onChange(event)
  }

  return (
    <RadioWrapper className="form-check" width={width}>
      <input
        className="form-check-input"
        checked={value === groupValue}
        disabled={disabled}
        id={id}
        name={name}
        onChange={_change}
        type="radio"
        value={value}
      />
      <label
        className="form-check-label"
        htmlFor={id}
      >
        {label}
      </label>
    </RadioWrapper>
  )
}
