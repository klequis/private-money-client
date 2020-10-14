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
}) => {
  // const _handleChange = (event) => onChange(event)
  return <Wrapper>
    <input 
      type="checkbox" 
      name={name} 
      checked={checked} 
      onChange={onChange}
    />
  </Wrapper>
}

export default CheckBox
