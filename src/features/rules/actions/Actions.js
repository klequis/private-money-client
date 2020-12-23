import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionEdit } from './ActionEdit'
import { RenameDescription } from './RenameDescription'
import { Categorize } from './Categorize'
import { actionTypes, ruleEditActionsReplace, ruleEditSetDefaultActions } from 'features/rules'
import { txFields } from 'features/tx'
import styled from 'styled-components'
import { selectRuleEditActions, selectRuleEdit, selectActiveTxOrigDescription } from 'features/selectors'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { makeTmpId } from 'lib/makeTmpId'

/* eslint-disable */
import { green, redf, purple } from 'logger'
import { RenderCount } from 'components/RenderCount'
/* eslint-enable */

const ActionsH4 = styled.h4`
  margin-bottom: 16px;
`

const ActionsDiv = styled.div`
  display: flex;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`
const OmitCheck = styled.input`
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`

let countTotal = 0
let countReturn = 0

export const Actions = () => {
  countTotal = countTotal + 1

  const _actions = useSelector((state) => selectRuleEditActions(state))
  const _rule = useSelector(selectRuleEdit)
  // green('_rule', _rule)

  // green('hasActionTypeOmit', hasActionTypeOmit)
  const [_omitChecked, _setOmitChecked] = useState(false)
  // green('Actions: _omitChecked', _omitChecked)

  const [_prevActions, _setPrevActions] = useState([])
  const _dispatch = useDispatch()

  const _origDescription = useSelector(selectActiveTxOrigDescription)

  useEffect(() => {
    const { hasActionTypeOmit } = _rule
    // green('Actions: hasActionTypeOmit', R.type(hasActionTypeOmit))
    if (!isNilOrEmpty(hasActionTypeOmit)) {
      // green('set it ***************')
      _setOmitChecked(hasActionTypeOmit)
    }

  }, [_rule])

  if (isNilOrEmpty(_actions)) {
    return null
  }

  const _handleOmitChange = (e) => {
    const checked = e.target.checked
    _setOmitChecked(checked)
    _setPrevActions(_actions)
    if (checked) {
      _dispatch(ruleEditActionsReplace({
        _id: makeTmpId(),
        actionType: actionTypes.omit.name
      }))
    } else {
      if (!isNilOrEmpty(_prevActions)) {
        _dispatch(ruleEditActionsReplace(_prevActions))
      } else {
        _dispatch(ruleEditSetDefaultActions(_origDescription))
      }
    }
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
      <OmitCheck
        type="checkbox"
        checked={_omitChecked}
        onChange={_handleOmitChange}
      />{' '}
      Omit transaction(s)
      {_omitChecked ? null : (
        <ActionsDiv>
          {_actions.map((a) => {
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
        </ActionsDiv>
      )}
    </div>
  )
}
