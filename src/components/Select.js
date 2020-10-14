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

      <div>
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

      <div>
        <label style={{ visibility: 'hidden' }}>Error!</label>
      </div>

    </>
  )
}

export default Select
