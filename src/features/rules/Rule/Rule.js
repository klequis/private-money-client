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

import * as R from 'ramda'


// eslint-disable-next-line
import { green, purple } from 'logger'
import RenderCount from 'components/RenderCount'

const RuleDiv = styled.div``

const shouldShowRuleIds = ruleIds => !isNilOrEmpty(ruleIds) && ruleIds > 1

let countTotal = 0
let countReturn = 0

const Rule = () => {
  countTotal = countTotal + 1

  const activeTransaction = useSelector(selectActiveTransaction)

  const { ruleIds } = activeTransaction

  const ruleEdit = useSelector(selectRuleEdit)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isNilOrEmpty(ruleIds)) {
      const { origDescription, date } = activeTransaction
      dispatch(ruleEditTmpMake({ origDescription, date }))
    } else if (ruleIds.length === 1) {
      dispatch(ruleEditSet(ruleIds[0]))
    } else if (ruleIds.length > 1) {
      // ShowRuleIds below
    }
  }, [ruleIds, activeTransaction])

  if (shouldShowRuleIds(ruleIds)) {
    return <ShowRuleIds ruleIds={ruleIds} />
  }

  if (!ruleEdit) {
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

