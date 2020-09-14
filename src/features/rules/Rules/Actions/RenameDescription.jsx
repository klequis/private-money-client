import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import TextEdit from 'components/TextEdit'
import Form from 'react-bootstrap/Form'
import { updateRuleEditAction } from 'features/rules/rulesSlice'
import { actionFields } from 'globalConstants'
import * as R from 'ramda'

// eslint-disable-next-line
import { green, redf } from 'logger'


const RenameDescription = ({ action }) => {
  
  const [_action, _setAction] = useState(action)
  const { replaceWithValue } = _action
  const dispatch = useDispatch()

  green('RenameDescription: replaceWithValue', replaceWithValue)


  const _handleEvent = (event) => {
    const { value, type } = event.target
    const newAction = R.mergeRight(_action, { replaceWithValue: value })
    _setAction(newAction)
    if (type === 'blur') {
      dispatch(updateRuleEditAction(newAction))
    }
    
  }

  return (
    <div className="d-flex">
      <Form.Group controlId="bla">
        <Form.Label>Rename: </Form.Label>
        {/* <Form.Control type="email" placeholder="Enter email" size='sm' /> */}
        <TextEdit
          name={actionFields.replaceWithValue.name}
          value={replaceWithValue}
          onChange={_handleEvent}
          onBlur={_handleEvent}
          minWidth={300}
        />
      </Form.Group>
    </div>
  )
}

export default RenameDescription
