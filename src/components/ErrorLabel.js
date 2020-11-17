import React from 'react'
import styled from 'styled-components'

const Label = styled.div`
  width: 100%;
  margin: 0;
  background-color: ${(props) => (props.color === '' ? 'inherit' : props.color)};
`

export const ErrorLabel = ({ message, color }) => {
  return <Label color={color}>{message}</Label>
}
