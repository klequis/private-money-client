import React from 'react'
import styled from 'styled-components'
import ErrorLabel from './ErrorLabel'

const SelectControl = styled.select`
  width: 100%;
`
// background-color: green;
// padding-bottom: 30.4px;


/*
    <ErrorLabel /> is not used but there to preserve spacing when Select
    is used in row with TextEdit which will display error messages.
*/
const Select = ({
  name,
  value,
  onChange,
  disabled,
  children
}) => {
  return (
    <>
      <SelectControl
        className="custom-select custom-select-sm"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {children}
      </SelectControl>
      <ErrorLabel text='' />
    </>
  )
}

export default Select
