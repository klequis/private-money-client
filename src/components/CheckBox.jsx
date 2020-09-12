import React from 'react'
import FormCheck from 'react-bootstrap/FormCheck'

// eslint-disable-next-line
import { green, redf } from 'logger'

const CheckBox = ({
  name,
  checked,
  onChange,
  maxWidth,
  disabled,
  children
}) => {
  green('CheckBox: onChange', onChange)
  // const selectExtraSm = {
  //   height: 'calc(1.5em + 0.4rem + 2px)',
  //   paddingTop: 0,
  //   paddingBottom: 0,
  //   paddingRight: 0,
  //   fontSize: '0.675rem',
  //   // backgroundColor: 'green'
  //   maxWidth: maxWidth
  // }

  return (
    <FormCheck>
      <FormCheck.Input
        isInvalid
        type={'checkbox'}
        checked={checked}
        onChange={onChange}
        name={name}
      />
    </FormCheck>
  )
}

export default CheckBox

