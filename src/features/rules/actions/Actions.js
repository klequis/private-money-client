import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionEdit } from './ActionEdit'
import { RenameDescription } from './RenameDescription'
import { Categorize } from './Categorize'
import { actionTypes, ruleEditReplaceActions } from 'features/rules'
import { txFields } from 'features/tx'
import styled from 'styled-components'
import {
  selectRuleEditActions,
  selectRuleEditHasActionTypeOmit
} from 'features/selectors'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { makeTmpId } from 'lib/makeTmpId'

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
  const [_omitChecked, _setOmitChecked] = useState(
    useSelector(selectRuleEditHasActionTypeOmit)
  )
  const [_prevActions, _setPrevActions] = useState([])

  const _actions = useSelector((state) => selectRuleEditActions(state))
  // const _hasOmitAction =
  const _dispatch = useDispatch()

  // green('_hasOmitAction', _hasOmitAction)
  // green('Actions: actions', actions)
  // const o = useSelector(selectOmitAction)
  // green('o', o)
  // green('_prevActions', _prevActions)

  // useEffect(() => {
  //   if (!isNilOrEmpty(_actions)) {
  //     _setOmitChecked()
  //   }
  //   // eslint-disable-next-line
  // }, [])

  if (isNilOrEmpty(_actions)) {
    return null
  }

  const _handleOmitChange = (e) => {
    const checked = e.target.checked
    _setOmitChecked(checked)
    _setPrevActions(_actions)

    const newActions = checked
      ? {
          _id: makeTmpId(),
          actionType: actionTypes.omit.name
        }
      : _prevActions

    _dispatch(ruleEditReplaceActions(newActions))
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
        <Wrapper>
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
        </Wrapper>
      )}
    </div>
  )
}
