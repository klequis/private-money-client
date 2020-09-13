import React from 'react'
import Form from 'react-bootstrap/Form'

const Select = ({ name, value, onChange, handleBlur, maxWidth, disabled, children }) => {
  const selectExtraSm = {
    height: 'calc(1.5em + 0.4rem + 2px)',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    fontSize: '0.675rem',
    // backgroundColor: 'green'
    maxWidth: maxWidth
  }

  return (
    <Form.Control
      // className={styles.selectExtraSm}
      style={selectExtraSm}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      as="select"
      size="sm"
      custom
      disabled={disabled}
    >
      {children}
    </Form.Control>
  )
}

export default Select
