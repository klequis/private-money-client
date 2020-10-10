import React, { useState } from 'react'
import ActionControls from './ActionControls'
import { mergeRight } from 'ramda'
import Select from 'components/Select'
import Button from 'components/Button'

// eslint-disable-next-line
import { green, redf } from 'logger'

const ActionEdit = ({
  action: Action,
  actionRemove,
  handleDirtyChange,
  handleActionChange
}) => {
  const {
    _id,
    action = '',
    field = '',
    findValue = '',
    numAdditionalChars = '',
    replaceWithValue = '',
    category1 = '',
    category2 = ''
  } = Action

  const [_values, _setValues] = useState({
    _id: _id,
    action: action,
    field: field,
    findValue: findValue,
    numAdditionalChars: numAdditionalChars,
    replaceWithValue: replaceWithValue,
    category1: category1,
    category2: category2
  })

  const _actionRemove = () => {
    actionRemove(_id)
  }

  const _handleChange = event => {
    const { name, value } = event.target
    const newValues = mergeRight(_values, { [name]: value })
    _setValues(newValues)
    handleDirtyChange(true) 
    handleActionChange(newValues)
  }

  /* TODO:
      - Add rename, category1 & category2 as always present but can be blank
      - Move '-' button to below last criterion and make it say "Add Criterion"
  */

  return (
    <div key={_id} className={_classes.wrapper}>
      <div className={_classes.editModeWrapper}>
        <Select name="action" value={_values.action} onChange={_handleChange}>
          <option value="omit">Omit</option>
          <option value="strip">Strip</option>
          <option value="replaceAll">Rename</option>
          <option value="categorize">Categorize</option>
        </Select>
        <ActionControls values={_values} handleChange={_handleChange} />
        <Button onClick={_actionRemove}>Remove</Button>
      </div>
    </div>
  )
}

export default ActionEdit
