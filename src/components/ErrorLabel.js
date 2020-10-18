import React from 'react'
import styled from 'styled-components'

const Label = styled.label`
  
  width: 100%;
  margin: 0;
`
// background-color: green; 

const ErrorLabel = ({text}) => {
  return (
    <Label>
      {text}
    </Label>
  )
}

export default ErrorLabel