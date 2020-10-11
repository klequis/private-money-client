import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRuleEditCriteria } from 'features/ruleEdit/ruleEditSlice'
import {
  fetchCriteriaResults,
  criteriaResultsClear
} from 'features/criteriaResults/criteriaResultsSlice'
import { selectCriteriaResultsTransactions } from 'features/transactions/transactionsSlice'
// import isNilOrEmpty from 'lib/isNilOrEmpty'
// import criteriaValidation from './criteriaValidation'
import Table from 'components/Table'
import * as R from 'ramda'
import { requestStatus } from 'globalConstants'
import getRequestStatus from 'lib/getRequestStatus'

// eslint-disable-next-line
import { green, redf, yellow, purple } from 'logger'
// import { criteriaSelectFieldNames, operatorSelectFieldNames } from 'globalConstants'
import RenderCount from 'components/RenderCount'

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

const getActiveCriteria = (criteria) =>
  criteria === null ? [] : criteria.filter((c) => c.active === true)



// const checkCriterionValid = (criterion) => {
//   const { _id, field, operation, value, active} = criterion
//   const conditions = [
//     R.type(_id) === 'String',
//     R.includes(field, criteriaSelectFieldNames),
//     R.includes(operation, operatorSelectFieldNames),
//     !isNilOrEmpty(value),
//     active === true
//   ]
// }
const isCriteriaValid = (criteria) => {
  // tmp code
  return true
  // _id is a string
  // field is one of
  // operation is on of
  // value !isEmptyOrNull
  // active = true

  // const check = R.map(checkCriterionValid, criteria)
  // green('check', check)

}

let countTotal = 0
const countTotalExpected = 4
let countReturn = 0
const countReturnExpected = 2

const CriteriaResults = () => {
  countTotal = countTotal + 1
  const dispatch = useDispatch()

  // get request status
  const state = useSelector(state => state)
  const slices = R.pick(['criteriaResults'])(state)
  const status = getRequestStatus(slices)

  const criteria = useSelector(selectRuleEditCriteria)

  useEffect(() => {
    if (criteria) {
      const activeCriteria = getActiveCriteria(criteria)
      if (isCriteriaValid(activeCriteria)) {
        dispatch(fetchCriteriaResults(activeCriteria))
        
      } else {
        dispatch(criteriaResultsClear())
      }
    }
  }, [criteria, dispatch])


  const criteriaResultsTransactions = useSelector(
    selectCriteriaResultsTransactions
  )

  if (status === requestStatus.pending) {
    return <h1>Loading</h1>
  }

  if (status === requestStatus.error) {
    return <h1>Error</h1>
  }

  if (!criteria) {
    return null
  }

  countReturn = countReturn + 1
  return (
    <div>
      <RenderCount
          name="CriteriaResults"
          countTotal={countTotal}
          countTotalExpected={countTotalExpected}
          countReturn={countReturn}
          countReturnExpected={countReturnExpected}
        />
      {/* <h1 className={styles.sectionTitle}>Transactions</h1>
        <Button>Test</Button> */}
      <Table size="sm" variant="dark">
        <TableHead />
        <tbody>
          {criteriaResultsTransactions.map((t) => (
            <tr key={t._id}>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>{t.amount}</td>
              <td>{t.category1}</td>
              <td>{t.category2}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
  // }
}

export default CriteriaResults
