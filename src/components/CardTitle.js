import styled from 'styled-components'

const CardTitleDiv = styled.div`
  margin-top: 0;
  font-weight: 500;
  line-height: 1.2;
  font-size: 1.171875rem;
  margin-bottom: 0.75rem;
`

export const CardTitle = ({ children }) => {
  return <CardTitleDiv>{children}</CardTitleDiv>
}
