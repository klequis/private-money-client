import styled from 'styled-components'

const CardSubtitleDiv = styled.div`
  font-weight: 500;
  line-height: 1.2;
  font-size: 0.9375rem;
  margin-top: -0.375rem;
  margin-bottom: 0;
`

export const CardSubTitle = ({ children }) => {
  return <CardSubtitleDiv>{children}</CardSubtitleDiv>
}
