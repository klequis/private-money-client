import React from 'react'
import { useSelector } from 'react-redux'
import { selectRuleActions, selectRuleEditActions } from 'features/rules/rulesSlice'
import { selectTmpRuleActions } from 'features/rulesTmp/rulesTmpSlice'
import ActionEdit from './ActionEdit'
import isTmpRule from 'lib/isTmpRule'
import RenameDescription from './RenameDescription'
import Categorize from './Categorize'
import styles from '../Rules.module.css'
import Form from 'react-bootstrap/Form'

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
  
  const Control = ({ action }) => {
    green('action._id', action._id)
    if (action.field === 'description') {
      return <RenameDescription key={action._id} action={action} />
    } else if (action.actionType === 'categorize') {
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
