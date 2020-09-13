import React from 'react'
import { useSelector } from 'react-redux'
import { selectRuleActions, selectRuleEditActions } from 'features/rules/rulesSlice'
import ActionEdit from './ActionEdit'
import isTmpRule from 'lib/isTmpRule'
import RenameDescription from './RenameDescription'
import Categorize from './Categorize'
import styles from '../Rules.module.css'
import Form from 'react-bootstrap/Form'
import { actionTypes, transactionFields as fields } from 'globalConstants'
import * as R from 'ramda'
import { updateRuleEditAction } from 'features/rules/rulesSlice'

// eslint-disable-next-line
import { green, redf } from 'logger'



const Actions = ({ ruleId }) => {

  const actions = useSelector((state) => {
    if (isTmpRule(ruleId)) {
      return selectRuleEditActions(state)
    } else {
      return selectRuleActions(ruleId, state)
    }
  })

  // const _handleChange = (event) => {
  //   const { name, value } = event.target
  //   const newAction = R.mergeRight(_action, { [name]: value})
  //   _setAction(newAction)
  //   dispatch(updateRuleEditAction)
  // }
  
  const Control = ({ action }) => {
    if (action.field === fields.description.name) {
      return <RenameDescription key={action._id} action={action} />
    } else if (action.actionType === actionTypes.categorize.name) {
      return <Categorize key={action._id} action={action} />
    } else {
      return <ActionEdit key={action._id} action={action} />
    }
  }

  if (!actions) {
    return null
  }

  return (
    <>
      <h4>Actions</h4>
      <div className={styles.omitAndDateCheck}>
        <Form.Check type="switch" id="omit" label="omit" />
      </div>
      {actions.map((a) => {
        
        return (
          <div key={a._id}>
            <Control action={a} />
          </div>
        )
      })}
    </>
  )
}

export default Actions
