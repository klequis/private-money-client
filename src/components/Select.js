import React from 'react'
import styled from 'styled-components'
import ErrorLabel from './ErrorLabel'

const SelectControl = styled.select`
  width: 100%;
`
// background-color: green;
// padding-bottom: 30.4px;

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
      <ErrorLabel text='Select' />
    </>
  )
}

export default Select
