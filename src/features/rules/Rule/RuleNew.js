import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  // activeTransactionClear,
  selectActiveTransaction,
  // selectActiveTransactionId,
  // setRefresh
} from 'features/transactions'
import {
  ruleEditTmpMake,
  selectRuleEdit
} from 'features/ruleEdit'
import styled from 'styled-components'
import { Criteria, Actions } from 'features/rules'
import Button from 'components/Button'
import RuleId from './RuleId'

const RuleDiv = styled.div``

export const RuleNew = ({ save, cancel}) => {

  const dispatch = useDispatch()
  const activeTransaction = useSelector(selectActiveTransaction)
  useEffect(() => {
    const { origDescription, date } = activeTransaction
    dispatch(ruleEditTmpMake({ origDescription, date }))
  }, [activeTransaction])

  const ruleEdit = useSelector(selectRuleEdit)

  const { _id: ruleId } = ruleEdit

  return (
    <RuleDiv id="Rule">
      <h1>Rule</h1>
      <RuleId ruleId={ruleId} />
      <Button onClick={save}>Save</Button>
      <Button onClick={cancel}>Cancel</Button>
      <Criteria />
      <Actions />
    </RuleDiv>
  )
}