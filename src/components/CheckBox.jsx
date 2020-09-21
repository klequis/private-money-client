import React from 'react'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf } from 'logger'

const Wrapper = styled.div`
  @media (min-width: 601px) {
    margin-bottom: 29.1665;
  }

  @media (max-width: 600px) {
    margin-bottom: 0;
    text-align: center;
  }
`
// style={{ marginBottom: 29.1665 }}

const CheckBox = ({
  name,
  checked,
  onChange,
  maxWidth,
  disabled,
  children
}) => {
  // const selectExtraSm = {
  //   height: 'calc(1.5em + 0.4rem + 2px)',
  //   paddingTop: 0,
  //   paddingBottom: 0,
  //   paddingRight: 0,
  //   fontSize: '0.675rem',
  //   // backgroundColor: 'green'
  //   maxWidth: maxWidth
  // }
  const _handleChange = (event) => onChange(event)
    
  return <Wrapper> <input type="checkbox" name={name} checked={checked} onChange={_handleChange}/></Wrapper>
}

export default CheckBox
