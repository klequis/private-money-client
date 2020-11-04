import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectActiveTransaction,
} from 'features/transactions'
import {
  selectRuleEdit,
  ruleEditSet,
} from 'features/ruleEdit'
import {
  selectRule
} from 'features/rules'
import styled from 'styled-components'
import { Criteria, Actions } from 'features/rules'
import Button from 'components/Button'
import RuleId from './RuleId'
import * as R from 'ramda'

// eslint-disable-next-line
import { green } from 'logger'

const RuleDiv = styled.div``

export const RuleExisting = ({ save, cancel }) => {

  const dispatch = useDispatch()
  const activeTransaction = useSelector(selectActiveTransaction)
  const { ruleIds } = activeTransaction
  const ruleId = ruleIds[0]
  const rule = useSelector(state => selectRule(ruleId, state))

  useEffect(() => {
    dispatch(ruleEditSet(rule))
  }, [rule])
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