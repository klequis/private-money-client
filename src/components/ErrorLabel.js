import React from 'react'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'

const Label = styled.div`
  width: 100%;
  margin: 0;
  color: ${(props) => (props.color === '' ? 'inherit' : props.color)};
`

export const ErrorLabel = ({ errorLevel }) => {
  // green('ErrorLabel: errorLevel', errorLevel)  
  return <Label color={errorLevel.color}>{errorLevel.message}</Label>
}
