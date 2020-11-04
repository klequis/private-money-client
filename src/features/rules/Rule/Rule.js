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
import { RuleNew } from './RuleNew'
import { RuleExisting } from './RuleExisting'

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
  const activeTransaction = useSelector(selectActiveTransaction)
  const { ruleIds } = activeTransaction
  const ruleEdit = useSelector(selectRuleEdit)
  const dispatch = useDispatch()

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

  if (isNilOrEmpty(ruleIds) || ruleIds.length === 0) {
    return <RuleNew
      save={_handleSaveClick}
      cancel={_handleCancelClick}
    />
  }

  if (ruleIds.length === 1) {
    return <RuleExisting
      save={_handleSaveClick}
      cancel={_handleCancelClick}
    />
  }

  if (ruleIds.length > 1) {
    return <ShowRuleIds />
  }

}

export default Rule

