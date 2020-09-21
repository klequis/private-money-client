import React from 'react'
import { useSelector } from 'react-redux'
import { selectRuleActions, selectRuleEditActions } from 'features/rules/rulesSlice'
import ActionEdit from './ActionEdit'
import isTmpRule from 'lib/isTmpRule'
import RenameDescription from './RenameDescription'
import Categorize from './Categorize'
import { actionTypes, transactionFields as fields } from 'globalConstants'
import styled from 'styled-components'

// eslint-disable-next-line
import { green, redf } from 'logger'

const Wrapper = styled.div`
  padding-top: 15px;
  @media (min-width: 601px) {

  }

  @media (max-width: 600px) {

  }
`


const Actions = ({ ruleId }) => {

  const actions = useSelector((state) => {
    if (isTmpRule(ruleId)) {
      return selectRuleEditActions(state)
    } else {
      return selectRuleActions(ruleId, state)
    }
  })

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
    <Wrapper>
      {/* <div className={styles.omitAndDateCheck}>
        <Form.Check type="switch" id="omit" label="omit" />
      </div> */}
      {actions.map((a) => {
        
        return (
          <div key={a._id}>
            <Control action={a} />
          </div>
        )
      })}
    </Wrapper>
  )
}

export default Actions
