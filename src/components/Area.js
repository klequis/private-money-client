import { theme } from 'bootstrap/theme'
import styled from 'styled-components'
import * as R from 'ramda'

const getColor = (bgColor) =>
  R.isNil(bgColor) ? theme.colors.primary : theme.colors[bgColor]

const AreaDiv = styled.div`
  background-color: ${({ bgColor }) => getColor(bgColor)};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`
export const Area = ({ bgColor, children, width, height }) => {
  return (
    <AreaDiv bgColor={bgColor} width={width} height={height}>
      {children}
    </AreaDiv>
  )
}
