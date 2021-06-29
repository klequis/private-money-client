import styled from 'styled-components'

const CardTextDiv = styled.div`
  &:last-child {
    margin-bottom: 0;
  }
`

export const CardText = ({ children }) => {
  return <CardTextDiv>{children}</CardTextDiv>
}
