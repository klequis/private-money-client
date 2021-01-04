import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from 'components/Button'
import { selectRuleEditIsDirty } from 'features/selectors'

const RuleToolbarDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.25rem;
`

const Btn = styled(Button)`
  margin-right: 12px;
`

export const RuleToolbar = ({ save, cancel, deleteRule }) => {
  const _dirty = useSelector(selectRuleEditIsDirty)
  return (
    <RuleToolbarDiv>
      <Btn onClick={save} disabled={!_dirty}>
        Save
      </Btn>
      <Btn onClick={cancel}>Cancel</Btn>
      <Btn onClick={deleteRule}>Delete</Btn>
    </RuleToolbarDiv>
  )
}

RuleToolbar.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  deleteRule: PropTypes.func.isRequired
}
