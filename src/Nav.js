import { Link as BaseLink } from 'react-router-dom'
import styled from 'styled-components'

const NavDiv = styled.nav`
  display: flex;
`

const Link = styled(BaseLink)`
  margin-right: 10px;
`
export const Nav = () => {
  return (
    <NavDiv>
      <Link to="/import">Import</Link>
      <Link to="/export">Export</Link>
      <Link to="/transactions">Transactions</Link>
    </NavDiv>
  )
}
