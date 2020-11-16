import React from 'react'
import { useSelector } from 'react-redux'
import { selectRuleEditIsDirty } from 'features/ruleEdit'
import styled from 'styled-components'
import { Button } from 'components/Button'

const Wrapper = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
`

const Btn = styled(Button)`
  margin-right: 12px;
`

export const RuleToolbar = ({ save, cancel }) => {
  const dirty = useSelector(selectRuleEditIsDirty)
  return (
    <Wrapper>
      <Btn onClick={save} disabled={!dirty}>
        Save
      </Btn>
      <Btn onClick={cancel}>Cancel</Btn>
    </Wrapper>
  )
}
