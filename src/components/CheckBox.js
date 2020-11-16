import React from 'react'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf } from 'logger'

const CheckBoxDiv = styled.div`
  
`

/*
@media (min-width: 601px) {
    margin-bottom: 29.1665;
  }

  @media (max-width: 600px) {
    margin-bottom: 0;
    text-align: center;
  }
*/

export const CheckBox = ({
  name,
  checked,
  onChange,
}) => {
  return <CheckBoxDiv>
    <input 
      type="checkbox" 
      name={name} 
      checked={checked} 
      onChange={onChange}
    />
  </CheckBoxDiv>
}

