import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectRuleEdit,
  ruleUpdate,
  ruleCreate,
  ruleEditClear
} from 'features/rules'
import styled from 'styled-components'
import {
  activeTransactionIdClear,
  // selectActiveTransaction,
  setRefresh
} from 'features/transactions'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { ShowRuleIds } from './ShowRuleIds'
import { RuleToolbar } from './RuleToolbar'
import { RuleId } from './RuleId'
import { Criteria, Actions } from 'features/rules'

// eslint-disable-next-line
import { green, purple, red } from 'logger'
// eslint-disable-next-line
import { RenderCount } from 'components/RenderCount'

let countTotal = 0
let countReturn = 0

export const Rule = () => {
  countTotal = countTotal + 1

  const ruleEdit = useSelector(selectRuleEdit)
  const dispatch = useDispatch()

  const _handleSaveClick = async () => {
    const { isTmpRule } = ruleEdit
    if (isTmpRule) {
      await dispatch(ruleCreate(ruleEdit))
    } else {
      await dispatch(ruleUpdate(ruleEdit))
    }
    dispatch(setRefresh(true))
    dispatch(activeTransactionIdClear())
  }

  const _handleCancelClick = () => {
    dispatch(activeTransactionIdClear())
    dispatch(ruleEditClear())
    dispatch(activeTransactionIdClear())
  }

  const { dirty, _id: ruleId } = ruleEdit

  countReturn = countReturn + 1
  return (
    <>
      <RenderCount
        componentName="Rule"
        countTotal={{ actual: countTotal, min: 8, max: 14 }}
        countReturn={{ actual: countReturn, min: 8, max: 10 }}
      />
      <RuleId ruleId={ruleId} />
      <RuleToolbar
        save={_handleSaveClick}
        cancel={_handleCancelClick}
        dirty={dirty}
      />
      <Criteria />
      <Actions />
    </>
  )
}
