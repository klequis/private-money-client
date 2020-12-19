
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ruleEditActionUpdate } from 'features/rules'
import * as R from 'ramda'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// eslint-disable-next-line
import { purple, green, redf } from 'logger'
import { selectRuleEditRenameAction } from 'features/selectors'

const TextInput = styled.input`
  width: ${(props) => props.width + 'px'};
`

export const RenameDescription = ({ width }) => {

  const [_action, _setAction] = useState(useSelector(selectRuleEditRenameAction))
  const { replaceWithValue, _id: actionId } = _action

  const dispatch = useDispatch()

  const _onChange = (event) => {
    const { value } = event.target
    const newAction = R.mergeRight(_action, { replaceWithValue: value })
    _setAction(newAction)
    dispatch(ruleEditActionUpdate(newAction))
  }

  return (
    <TextInput
      key={actionId}
      className="mr-1"
      width={width}
      type="text"
      value={replaceWithValue}
      name="replaceWithValue"
      onChange={_onChange}
      // onBlur={_onBlur}
      placeholder='hi'
    />
  )
}


RenameDescription.propTypes = {
  width: PropTypes.number,
}

/*



import React, {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ruleEditActionUpdate, selectRuleEditAction } from 'features/rules'
import * as R from 'ramda'

// eslint-disable-next-line
import { purple, green, redf } from 'logger'

export const RenameDescription = ({ actionId }) => {

  const action = useSelector(state => selectRuleEditAction(actionId, state))

  const dispatch = useDispatch()

  const _onChange = (event) => {
    const { value } = event.target
    const newAction = R.mergeRight(action, { replaceWithValue: value })
    dispatch(ruleEditActionUpdate(newAction))
  }

  return (
    <input
      key={actionId}
      type="text"
      value={action.replaceWithValue}
      name="replaceWithValue"
      onChange={_onChange}
      // onBlur={_onBlur}
      placeholder='hi'
      // onKeyDown={_onKeyDown}
    />
  )
}


*/
