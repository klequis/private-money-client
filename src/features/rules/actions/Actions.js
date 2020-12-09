import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionEdit } from './ActionEdit'
import { RenameDescription } from './RenameDescription'
import { Categorize } from './Categorize'
import { actionFields, actionTypes, ruleEditReplaceActions } from 'features/rules'
import { txFields } from 'features/tx'
import styled from 'styled-components'
import { selectRuleEditActions, selectOmitAction } from 'features/selectors'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
// eslint-disable-next-line
import { green, redf, purple } from 'logger'
import { RenderCount } from 'components/RenderCount'

const Wrapper = styled.div`
  display: flex;
`
const OmitCheck = styled.input`
  margin-top: 16px;
  margin-bottom: 20px;
`

let countTotal = 0
let countReturn = 0

export const Actions = () => {
  countTotal = countTotal + 1
  const [_omitChecked, _setOmitChecked] = useState(false)

  const actions = useSelector((state) => selectRuleEditActions(state))
  green('Actions: actions', actions)
  const o = useSelector(selectOmitAction)
  green('o', o)
  
  const dispatch = useDispatch()
  // useEffect(() => {
  //   if (!isNilOrEmpty(actions)) {

  //   }
  // })

  if (!actions) {
    return null
  }

  const _handleOmitChange = (e) => {
    _setOmitChecked(e.target.checked)
    // add omit action

    const action = {
      actionType: actionTypes.omit.name,
    }
    dispatch(ruleEditReplaceActions(action))
    /*
        Need to remove all existing actions and
        replace with the action above.

        There is no need to send an action. I
        can all be done in the reducer.

        Remember. It is updating Redux and not
        going to the db until save is clicked.
    */
  }

  countReturn = countReturn + 1
  return (
    <div>
      <h4>Actions</h4>
      <RenderCount
        componentName="Actions"
        countTotal={{ actual: countTotal, min: 2, max: 2 }}
        countReturn={{ actual: countReturn, min: 2, max: 2 }}
      />
      <OmitCheck type="checkbox" checked={_omitChecked} onChange={_handleOmitChange} /> Omit transaction(s)
      <Wrapper>
        {actions.map((a) => {
          const { _id, field, actionType } = a
          if (field === txFields.description.name) {
            return (
              <RenameDescription
                key={_id}
                actionId={_id}
                minChars={3}
                maxWidth={10}
              />
            )
          } else if (actionType === actionTypes.categorize.name) {
            return <Categorize key={_id} action={a} minChars={3} />
          } else {
            return <ActionEdit key={_id} action={a} />
          }
        })}
      </Wrapper>
    </div>
  )
}
