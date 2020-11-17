import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectActiveTransaction,
} from 'features/transactions'
import {
  ruleEditTmpMake,
  // selectRuleEdit
} from 'features/ruleEdit'
import styled from 'styled-components'
import { Criteria, Actions } from 'features/rules'

// eslint-disable-next-line
import { green, purple, red } from 'logger'

const RuleDiv = styled.div``

export const RuleNew = () => {

  const dispatch = useDispatch()
  const activeTransaction = useSelector(selectActiveTransaction)
  useEffect(() => {
    const { origDescription, date } = activeTransaction
    dispatch(ruleEditTmpMake({ origDescription, date }))
  }, [activeTransaction, dispatch])

  // const ruleEdit = useSelector(selectRuleEdit)

  // const { _id: ruleId, dirty } = ruleEdit

  return (
    <RuleDiv id="Rule">
      <Criteria />
      <Actions />
    </RuleDiv>
  )
}