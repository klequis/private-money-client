import React from 'react'

const Select = ({
  name,
  value,
  onChange,
  handleBlur,
  maxWidth = null,
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
          onBlur={handleBlur}
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

// style={selectExtraSm}
// const selectExtraSm = {
//   height: 'calc(1.5em + 0.4rem + 2px)',
//   paddingTop: 0,
//   paddingBottom: 0,
//   paddingRight: 0,
//   fontSize: '0.675rem',
//   // backgroundColor: 'green'
//   maxWidth: maxWidth
// }
