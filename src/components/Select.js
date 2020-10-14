import React from 'react'

const Select = ({
  name,
  value,
  onChange,
  disabled,
  children
}) => {
  return (
    <>

      <div style={{ backgroundColor: 'blue' }}>
        <select
          className="custom-select custom-select-sm"
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          {children}
        </select>
      </div>

      <div style={{ backgroundColor: 'green', border: '1px solid white' }}>
        <label style={{ visibility: 'hidden' }}>Error!</label>
      </div>

    </>
  )
}

export default Select
