
import React, {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ruleEditActionUpdate } from 'features/rules'
import * as R from 'ramda'
import { selectRuleEditRenameAction } from 'features/selectors'

// eslint-disable-next-line
import { purple, green, redf } from 'logger'

export const RenameDescription = () => {
  const [_action, _setAction] = useState(useSelector(selectRuleEditRenameAction))
  const { replaceWithValue, _id: actionId } = _action

  const _dispatch = useDispatch()

  const _onChange = (event) => {
    const { value } = event.target
    const newAction = R.mergeRight(_action, { replaceWithValue: value })
    _setAction(newAction)
    _dispatch(ruleEditActionUpdate(newAction))
  }

  return (
    <input
      key={actionId}
      type="text"
      value={replaceWithValue}
      name="replaceWithValue"
      onChange={_onChange}
      placeholder='new description'
    />
  )
}
