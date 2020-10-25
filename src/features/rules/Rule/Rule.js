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
  selectActiveTransactionId
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
  green('activeTransaction', activeTransaction)
  // const activeTransactionId = useSelector(selectActiveTransactionId)
  // green('activeTransactionId', activeTransactionId)


  //

    const { ruleIds } = activeTransaction
    green('ruleIds', isNilOrEmpty(ruleIds))

  //


  const ruleEdit = useSelector(selectRuleEdit)
  green('type ruleEdit', ruleEdit)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isNilOrEmpty(ruleIds)) {
      dispatch(ruleEditTmpMake()) 
    } else if (ruleIds.length === 1) {
      dispatch(ruleEditSet(ruleIds[0]))
    } else if (ruleIds.length > 1) {
      // ShowRuleIds below
    }
  }, [ruleIds])

  if (shouldShowRuleIds(ruleIds)) {
    return <ShowRuleIds ruleIds={ruleIds} />
  }

  if (!ruleEdit) {
    return null
  }

  const _handleSaveClick = () => {
    // green('Rule: ruleEdit', ruleEdit)
    if (isTmpRule(ruleEdit)) {

      dispatch(ruleCreate(ruleEdit))
      // green('CREATED')
    } else {
      dispatch(ruleUpdate(ruleEdit))
      // green('UPDATED')
    }
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

