// TODO: implement _isCriterionValid

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { criteriaResultsFetch } from 'features/criteriaResults'
import { Table } from 'components/Table'
import * as R from 'ramda'
import { TableBody } from './TableBody'
import styled from 'styled-components'
import {
  selectRuleEditActiveCriteria,
  selectRuleEditCriteria,
  selectRuleEditActions,
  selectCriteriaResults,
  selectRequestStatus
} from 'features/selectors'
import { RenderWhenReady } from 'components/RenderWhenReady'
import { wdCriteriaResultsFetchStatus } from 'appWords'
/* eslint-disable */
import { green, redf, yellow, purple, grpStart, grpEnd } from 'logger'
import { RenderCount } from 'components/RenderCount'
/* eslint-enable */

const CriteriaResultsDiv = styled.div`
  margin-top: 12px;
`

const H4 = styled.h4`
  margin-right: 12px;
  margin-bottom: 0;
`

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Amount</th>
        <th>Category 1</th>
        <th>Category 2</th>
      </tr>
    </thead>
  )
}

let countTotal = 0
let countReturn = 0

export const CriteriaResults = () => {
  countTotal = countTotal + 1
  const dispatch = useDispatch()

  const status = useSelector((state) =>
    selectRequestStatus([wdCriteriaResultsFetchStatus], state)
  )
  const criteria = useSelector(selectRuleEditCriteria)
  const actions = useSelector(selectRuleEditActions)
  const activeCriteria = useSelector(selectRuleEditActiveCriteria)

  useEffect(() => {
    // TODO: make use of 'valid'. There is a criteriaValidation
    //       in rules/criteria
    // const valid = isCriteriaValid(activeCriteria)
    if (!R.isEmpty(activeCriteria)) {
      dispatch(criteriaResultsFetch(activeCriteria))
    }
    // eslint-disable-next-line
  }, [criteria])
  // }, [activeCriteria, dispatch])

  const transactions = useSelector(selectCriteriaResults)

  if (R.isEmpty(criteria) || R.isEmpty(actions)) {
    return null
  }

  countReturn = countReturn + 1
  return (
    <CriteriaResultsDiv>
      <H4>Criteria Results</H4>
      <div>{transactions.length} transactions found.</div>
      <RenderWhenReady status={status}>
        <div>
          <RenderCount
            componentName="CriteriaResults"
            countTotal={{ actual: countTotal, min: 6, max: 6 }}
            countReturn={{ actual: countReturn, min: 6, max: 6 }}
          />
          <Table size="sm" variant="dark">
            <TableHead />
            {transactions.map((t) => {
              return <TableBody key={t._id} actions={actions} transaction={t} />
            })}
          </Table>
        </div>
      </RenderWhenReady>
    </CriteriaResultsDiv>
  )
}
