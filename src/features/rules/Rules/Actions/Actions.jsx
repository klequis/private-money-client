import React from 'react'
import { useSelector } from 'react-redux'
import { selectRuleActions } from 'features/rules/rulesSlice'
import { selectTmpRuleActions } from 'features/rulesTmp/rulesTmpSlice'
import ActionEdit from './ActionEdit'
import isTmpRule from '../isTmpRule'

// eslint-disable-next-line
import { green, redf } from 'logger'

const Actions = ({ ruleId }) => {
  const actions = useSelector((state) => {
    if (isTmpRule(ruleId)) {
      return selectTmpRuleActions(ruleId, state)
    } else {
      return selectRuleActions(ruleId, state)
    }
  })
  green(`actions ${ruleId}`, actions)
  return (
    <>
      <h4>Actions</h4>
      {actions.map((a) => (
        <ActionEdit key={a._id} action={a} />
      ))}
    </>
  )
}

export default Actions
