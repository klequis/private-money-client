import React from 'react'
import { useSelector } from 'react-redux'
import { selectRuleActions } from 'features/rules/rulesSlice'
import ActionEdit from './ActionEdit'

// eslint-disable-next-line
import { green, redf } from 'logger'

const Actions = ({ ruleId }) => {
  const actions = useSelector((state) => selectRuleActions(ruleId, state))
  green('actions', actions)
  return actions.map(a => <ActionEdit key={a._id} action={a} />)
}

export default Actions
