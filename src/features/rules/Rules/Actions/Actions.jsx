import React from 'react'
import { useSelector } from 'react-redux'
import { selectRuleActions } from 'features/rules/rulesSlice'
import { selectTmpRuleActions } from 'features/rulesTmp/rulesTmpSlice'
import ActionEdit from './ActionEdit'
import isTmpRule from '../isTmpRule'
import RenameDescription from './RenameDescription'
import Categorize from './Categorize'
import styles from '../Rules.module.css'
import Form from 'react-bootstrap/Form'

// eslint-disable-next-line
import { green, redf } from 'logger'



const Actions = ({ ruleId }) => {
  const actions = useSelector((state) => {
    if (isTmpRule(ruleId)) {
      return selectTmpRuleActions(ruleId, state)
    } else {
      return selectRuleActions(ruleId, state)
    }
  })
  if (isTmpRule) {

  }
  const Control = ({action}) => {
    green('Control: action.field', action.field)
    if (action.field === 'description') {
      green('control: RenameDescription')
      return <RenameDescription key={action._id} action={action} />
    } else if (action.actionType === 'categorize') {
      return <Categorize key={action._id} action={action} />
    } else {
      green('control: ActionEdit')
      return <ActionEdit key={action._id} action={action} />
    }
  }


  return (
    <>
      <h4>Actions</h4>
      <div className={styles.omitAndDateCheck}>
        <Form.Check type="switch" id="omit" label="omit" />
      </div>
      {actions.map((a) => {
        return (
          <div
            style={{
              backgroundColor: 'orange',
              border: '1px solid orange',
              padding: 5,
              margin: 5
            }}
          >
            <Control action={a} />
            {/* <ActionEdit key={a._id} action={a} /> */}
          </div>
        )
      })}
    </>
  )
}

export default Actions
