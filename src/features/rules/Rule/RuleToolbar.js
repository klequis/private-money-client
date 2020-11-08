import React from 'react'
import { useSelector } from 'react-redux'
import { selectRuleEditIsDirty } from 'features/ruleEdit'
import styled from 'styled-components'
import Button from 'components/Button'

const Wrapper = styled.div`
`
export const RuleToolbar = ({ save, cancel }) => {
  const dirty = useSelector(selectRuleEditIsDirty)
  return (
    <Wrapper>
      <Button onClick={save} disabled={!dirty}>Save</Button>
      <Button onClick={cancel}>Cancel</Button>
    </Wrapper>
  )
}