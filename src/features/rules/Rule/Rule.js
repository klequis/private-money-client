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
import { selectRuleEdit } from 'features/selectors'

/* eslint-disable */
import { green, purple, red } from 'logger'
import { RenderCount } from 'components/RenderCount'
/* eslint-enable */

let countTotal = 0
let countReturn = 0

export const Rule = () => {
  countTotal = countTotal + 1

  const ruleEdit = useSelector(selectRuleEdit)
  const dispatch = useDispatch()

  const _handleSaveClick = async () => {
    const { isTmpRule } = ruleEdit
    if (isTmpRule) {
      const a = await dispatch(ruleCreate(ruleEdit))
      purple('1 - a tmp rule', a)
      // dispatch(ruleEditSave())
    } else {
      const b = await dispatch(ruleUpdate(ruleEdit))
      purple('1 - an existing rule', b)
    }
    
    // dispatch(txFetchStatusSetRefresh())
    // purple('2 - tx set refresh', 'done')
    // dispatch(rulesRefreshSet())
    // purple('3 - rules set refresh', 'done')
    // dispatch(txActiveIdClear())
    // purple('4 - active id clear', 'done')
    // dispatch(ruleEditClear())
  }

  const _handleCancelClick = () => {
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
