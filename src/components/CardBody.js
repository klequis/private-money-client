import styled from 'styled-components'

const CardBodyDiv = styled.div`
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.25rem;
`

export const CardBody = ({ children }) => {
  return <CardBodyDiv>{children}</CardBodyDiv>
}
