import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from 'components/Button'
import { selectRuleEditIsDirty } from 'features/selectors'

const Wrapper = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
`

const Btn = styled(Button)`
  margin-right: 12px;
`

export const RuleToolbar = ({ save, cancel, deleteRule }) => {
  const dirty = useSelector(selectRuleEditIsDirty)
  return (
    <Wrapper>
      <Btn onClick={save} disabled={!dirty}>
        Save
      </Btn>
      <Btn onClick={cancel}>Cancel</Btn>
      <Btn onClick={deleteRule}>Delete</Btn>
    </Wrapper>
  )
}
