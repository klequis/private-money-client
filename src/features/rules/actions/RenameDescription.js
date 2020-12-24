
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ruleEditActionUpdate } from 'features/rules'
import * as R from 'ramda'
import { selectRuleEditRenameAction } from 'features/selectors'
import styled from 'styled-components'
import { wdReplaceWithValue } from 'appWords'

// eslint-disable-next-line
import { purple, green, redf } from 'logger'

const RenameDescriptionInput = styled.input`
  width: 450px;
  margin-right: 0.25rem;
`

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
    <RenameDescriptionInput
      key={actionId}
      type="text"
      value={replaceWithValue}
      name={wdReplaceWithValue}
      onChange={_onChange}
      placeholder='new description'
    />
  )
}
