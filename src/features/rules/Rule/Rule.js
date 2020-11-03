import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Criteria, Actions } from 'features/rules'
import Button from 'components/Button'
import RuleId from './RuleId'
import {
  selectRuleEdit,
  ruleUpdate,
  ruleCreate,
  ruleEditClear,
  ruleEditSet,
  // ruleTmpMakeId, 
  // ruleTmpMake,
  ruleEditTmpMake
} from 'features/ruleEdit'
import styled from 'styled-components'
import { isTmpRule } from 'features/rules'

import {
  activeTransactionClear,
  selectActiveTransaction,
  selectActiveTransactionId,
  setRefresh
} from 'features/transactions'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { ShowRuleIds } from './ShowRuleIds'
import { selectRule } from 'features/rules/rulesSlice'


import * as R from 'ramda'


// eslint-disable-next-line
import { green, purple, red } from 'logger'
import RenderCount from 'components/RenderCount'

const RuleDiv = styled.div``

const shouldShowRuleIds = ruleIds => !isNilOrEmpty(ruleIds) && ruleIds > 1




let countTotal = 0
let countReturn = 0

const Rule = () => {
  countTotal = countTotal + 1
  console.group('Rule')
  const activeTransaction = useSelector(selectActiveTransaction)
  // green('activeTransaction', activeTransaction)

  const { ruleIds } = activeTransaction
  green('ruleIds', ruleIds)
  green('ruleIds', R.type(ruleIds))
  // green('ruleIds.length', ruleIds.length)
  const ruleId = 
  
  const rule = selectRule(ruleIds[0])
  // green('rule', R.type(rule))

  const ruleEdit = useSelector(selectRuleEdit)

  const dispatch = useDispatch()

  useEffect(() => {
    // console.group('useEffect')
    if (isNilOrEmpty(ruleIds)) {
      // green('tmp rule')
      const { origDescription, date } = activeTransaction
      dispatch(ruleEditTmpMake({ origDescription, date }))
    } else if (ruleIds.length === 1) {
      // green('ruleIds[0]', ruleIds[0])
      // green('num ruleIds', ' === 1')
      ruleEditSet()
      
    } else if (ruleIds.length > 1) {
      // green('ruleIds > 1')
      // ShowRuleIds below
    }
    // console.groupEnd()
  }, [ruleIds, activeTransaction])

  if (shouldShowRuleIds(ruleIds)) {
    red('early exit: ', 'shouldShowRuleIds')
    console.groupEnd()
    return <ShowRuleIds ruleIds={ruleIds} />
  }

  if (!ruleEdit) {
    red('early exit: ', '!ruleEdit')
    console.groupEnd()
    return null
  }

  const _handleSaveClick = async () => {
    if (isTmpRule(ruleEdit)) {
      await dispatch(ruleCreate(ruleEdit))
      green('ruleCreate', 'DONE')
    } else {
      await dispatch(ruleUpdate(ruleEdit))
      green('ruleUpdate', 'DONE')
    }

    // refresh
    green('dispatch Refresh')
    dispatch(setRefresh(true))

    dispatch(activeTransactionClear())
  }

  const _handleCancelClick = () => {
    dispatch(activeTransactionClear())
    dispatch(ruleEditClear())
  }

  const { _id: ruleId } = ruleEdit

  console.groupEnd()
  countReturn = countReturn + 1
  return (
    <>
      <RuleDiv id="Rule">
        {/* <RenderCount
          componentName="Rule"
          countTotal={{ actual: countTotal, min: 1, max: 2 }}
          countReturn={{ actual: countReturn, min: 2, max: 2 }}
        /> */}
        <h1>Rule</h1>
        <RuleId ruleId={ruleId} />
        <Button onClick={_handleSaveClick}>Save</Button>
        <Button onClick={_handleCancelClick}>Cancel</Button>
        <Criteria />
        <Actions />
      </RuleDiv>

    </>
  )
}

export default Rule

