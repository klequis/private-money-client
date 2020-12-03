// TODO: implement _isCriterionValid

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { criteriaResultsFetch } from 'features/criteriaResults'
import { Table } from 'components/Table'
import * as R from 'ramda'
// import { txFields } from 'features/tx'
import { TableBody } from './TableBody'
import styled from 'styled-components'
import {
  selectActiveCriteria,
  selectRuleEditCriteria,
  selectRuleEditActions,
  selectCriteriaResults,
  selectRequestStatus, 
} from 'features/selectors'
import {
  RenderWhenReady
} from 'components/RenderWhenReady'
import {
  wdCriteriaResultsFetchStatus
} from 'appWords'
// eslint-disable-next-line
import { green, redf, yellow, purple, grpStart, grpEnd } from 'logger'
// eslint-disable-next-line
import { RenderCount } from 'components/RenderCount'

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

// const isIdString = (value) => {
//   return R.type(R.prop('_id')(value)) === 'String'
// }

// const isFieldSelectFieldName = obj =>
//   R.includes(R.prop('field')(obj), fieldSelectFieldNames)

// const _checkCriterionValid = (criterion) => {
//   console.group('isCriteriaValid')
//   // _id is a string
//   console.groupEnd()
//   return true
// }

// const isCriteriaValid = (criteria) => {
//   return true
//   // tmp code
//   // return true
//   // field is one of
//   // operation is on of
//   // value !isEmptyOrNull
//   // active = true
//   // const check = R.map(_checkCriterionValid, criteria)
// }

let countTotal = 0
let countReturn = 0

export const CriteriaResults = () => {
  // purple('CriteriaResults', 'called')
  countTotal = countTotal + 1
  const dispatch = useDispatch()

  const status = useSelector((state) =>
    selectRequestStatus([wdCriteriaResultsFetchStatus], state)
  )
  // green('CriteriaResults: status', status)
  const criteria = useSelector(selectRuleEditCriteria)
  // green('CriteriaResults: criteria', criteria)
  const actions = useSelector(selectRuleEditActions)
  // green('CriteriaResults: actions', actions)
  const activeCriteria = useSelector(selectActiveCriteria)
  // green('CriteriaResults: activeCriteria', activeCriteria)
  
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
          {/* <h1 className={styles.sectionTitle}>Transactions</h1>
        <Button>Test</Button> */}
          <Table size="sm" variant="dark">
            <TableHead />
            {transactions.map((t) => {
              green('t', t)
              return <TableBody key={t._id} actions={actions} transaction={t} />

            })}
          </Table>
        </div>
      </RenderWhenReady>
    </CriteriaResultsDiv>
  )
}
