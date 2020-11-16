import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Select } from 'components/Select'
import { Strip } from './Strip'
import { ReplaceAll } from './ReplaceAll'
import * as R from 'ramda'
import { ruleEditActionUpdate } from 'features/ruleEdit'
import { actionTypes } from 'features/rules'

// eslint-disable-next-line
import { green, redf, purple } from 'logger'

export const ActionEdit = ({ action }) => {
  const [_action, _setAction] = useState(action)
  const { actionType } = _action

  const dispatch = useDispatch()

  const _handleChange = (event) => {
    const { name, value } = event.target
    const newAction = R.mergeRight(_action, { [name]: value })
    _setAction(newAction)
    dispatch(ruleEditActionUpdate(newAction))
  }
  const Control = () => {
    if (actionType === actionTypes.strip.name) {
      return <Strip action={action} onChange={_handleChange} />
    } else if (actionType === actionTypes.replaceAll.name) {
      return <ReplaceAll action={action} onChange={_handleChange} />
    } else {
      return null
    }
  }
  return (
    <div>
      <div>
        <b>action</b>
      </div>
      <div className="d-flex">
        <Select
          name="action"
          value={actionType}
          onChange={_handleChange}
          maxWidth={100}
        >
          <option value={actionTypes.strip.name}>
            {actionTypes.strip.description}
          </option>
          <option value={actionTypes.replaceAll.name}>
            {actionTypes.replaceAll.description}
          </option>
        </Select>
        <Control />
      </div>
    </div>
  )
}
