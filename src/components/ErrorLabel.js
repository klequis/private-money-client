import React from 'react'
import styled from 'styled-components'

const Label = styled.div`
  width: 100%;
  margin: 0;
`

export const ErrorLabel = ({ text }) => {
  return (
    <Label>
      {text}
    </Label>
  )
}
