import React from 'react'
import Form from 'react-bootstrap/Form'

const CheckBox = ({ name, checked, onChange, maxWidth, disabled, children }) => {

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
    <Form.Check
      // className={styles.selectExtraSm}
      style={selectExtraSm}
      name={name}
      // value={true}
      label=''
      checked={checked}
      onChange={onChange}
      type="checkbox"
      size="sm"
      custom
      
    />
    
  )
}

export default CheckBox
