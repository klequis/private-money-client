import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button'

const Wrapper = styled.div`
`
export const RuleToolbar = ({ save, cancel, dirty }) => {
  return (
    <Wrapper>
      <Button onClick={save} disabled={!dirty}>Save</Button>
      <Button onClick={cancel}>Cancel</Button>
    </Wrapper>
  )
}