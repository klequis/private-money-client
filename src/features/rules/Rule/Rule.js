import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  ruleUpdate,
  ruleEditSave,
  ruleCreate,
  ruleEditClear,
  rulesRefreshSet
} from 'features/rules'
import { txActiveIdClear, txFetchStatusSetRefresh } from 'features/tx'
import { RuleToolbar } from './RuleToolbar'
import { RuleId } from './RuleId'
import { Criteria, Actions } from 'features/rules'
import { selectRuleEdit, selectRuleEditIsTmpRule } from 'features/selectors'

/* eslint-disable */
import { green, purple, red } from 'logger'
import { RenderCount } from 'components/RenderCount'
import * as R from 'ramda'
/* eslint-enable */

let countTotal = 0
let countReturn = 0

export const Rule = () => {
  countTotal = countTotal + 1

  const ruleEdit = useSelector(selectRuleEdit)
  const dispatch = useDispatch()

  const _handleSaveClick = async () => {
    // const { isTmpRule } = ruleEdit
    dispatch(ruleEditSave())
    // if (isTmpRule) {
    //   const a = await dispatch(ruleCreate(ruleEdit))
    //   // const a = dispatch(ruleEditSave())
    //   purple('1 - a tmp rule', a)
    // } else {
    //   const b = await dispatch(ruleUpdate(ruleEdit))
    //   purple('1 - an existing rule', b)
    // }
  }

  const _handleCancelClick = () => {
    // TODO: ? create a ruleEditCancel action that executes these 3 actions?
    dispatch(txActiveIdClear())
    dispatch(ruleEditClear())
    dispatch(txActiveIdClear())
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
