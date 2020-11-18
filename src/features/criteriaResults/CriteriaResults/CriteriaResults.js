// TODO: implement _isCriterionValid

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectRuleEditCriteria,
  selectRuleEditActions,
  selectActiveCriteria
} from 'features/ruleEdit'
import { fetchCriteriaResults } from 'features/criteriaResults'
import { selectCriteriaResultsTransactions } from 'features/transactions'
import { Table } from 'components/Table'
import * as R from 'ramda'
import { getRequestStatus } from 'lib/getRequestStatus'
import { RequestStatus } from 'components/RequestStatus'
import { transactionFields as tFields } from 'features/transactions'
import { TableBody } from './TableBody'

// eslint-disable-next-line
import { green, redf, yellow, purple } from 'logger'
import { RenderCount } from 'components/RenderCount'

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

const _checkCriterionValid = (criterion) => {
  console.group('isCriteriaValid')
  // _id is a string
  // green('_id', tFields._id.validate(criterion._id))
  // green('field', tFields.)
  console.groupEnd()
  return true
}

const isCriteriaValid = (criteria) => {
  // green('criteria', criteria)
  return true
  // tmp code
  // return true
  // field is one of
  // operation is on of
  // value !isEmptyOrNull
  // active = true
  // green('criteriaSelectFieldNames', criteriaSelectFieldNames)
  const check = R.map(_checkCriterionValid, criteria)
  // green('check', check)
}

let countTotal = 0
let countReturn = 0

export const CriteriaResults = () => {
  countTotal = countTotal + 1
  const dispatch = useDispatch()

  // get status
  const state = useSelector((state) => state)
  const slices = R.pick(['criteriaResults'])(state)
  const status = getRequestStatus(slices)

  const criteria = useSelector(selectRuleEditCriteria)
  
  const actions = useSelector(selectRuleEditActions)
  const activeCriteria = useSelector(selectActiveCriteria)
  // green('CriteriaResults: activeCriteria', activeCriteria)

  useEffect(() => {
    // TODO: make use of 'valid'. There is a criteriaValidation
    //       in rules/criteria
    const valid = isCriteriaValid(activeCriteria)
    if (!R.isEmpty(activeCriteria)) {
      dispatch(fetchCriteriaResults(activeCriteria))
    }
  }, [criteria])
  // }, [activeCriteria, dispatch])

  const transactions = useSelector(selectCriteriaResultsTransactions)

  if (R.isEmpty(criteria) || R.isEmpty(actions)) {
    return null
  }

  countReturn = countReturn + 1
  return (
    <RequestStatus status={status}>
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
          {transactions.map((t) => (
            <TableBody key={t._id} actions={actions} transaction={t} />
          ))}
        </Table>
      </div>
    </RequestStatus>
  )
}
