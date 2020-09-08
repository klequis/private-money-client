import React, { useState } from 'react'
import Select from 'components/Select'
import Strip from './Strip'
import ReplaceAll from './ReplaceAll'
// eslint-disable-next-line
import { green, redf } from 'logger'

const ActionEdit = ({ action }) => {

  const _handleChange = () => {
    // tmp function
  }
  const Control = () => {
    if (action.actionType === 'strip') {
      return <Strip action={action} handleChange={_handleChange} />
    } else if (action.actionType === 'replaceAll') {
      return <ReplaceAll action={action} handleChange={_handleChange} />
    } else {
      return null
    }
  }
  return (
    <div /* style={{ backgroundColor: 'purple', border: '1px solid white'}} */>
      <div>
        <b>action</b>
      </div>
      <div className="d-flex">
        <Select
          name="action"
          value={action.actionType}
          onChange={_handleChange}
          maxWidth={100}
        >
          <option value="strip">Strip</option>
          <option value="replaceAll">Replace all</option>
        </Select>
        <Control />
      </div>
    </div>
  )
}

export default ActionEdit
