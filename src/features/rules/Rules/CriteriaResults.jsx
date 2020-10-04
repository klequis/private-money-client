import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRuleEditCriteria } from 'features/rules/rulesSlice'
import {
  fetchCriteriaResults,
  criteriaResultsClear
} from 'features/criteriaResults/criteriaResultsSlice'
import { selectCriteriaResultsTransactions } from 'features/transactions/transactionsSlice'
import isNilOrEmpty from 'lib/isNilOrEmpty'
import criteriaValidation from './criteriaValidation'
import Table from 'components/Table'

// eslint-disable-next-line
import { green, redf, yellow } from 'logger'

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

const CriteriaResults = () => {
  // const [_areCriteriValid, _setAreCriteriaValid] = useState(false)

  const dispatch = useDispatch()
  const criteria = useSelector(selectRuleEditCriteria)
  // green('CriteriaResults: criteria', criteria)
  useEffect(() => {
    // if (criteria !== null) {

    const activeCriteria = getActiveCriteria(criteria)
    // green('CriteriaResults: activeCriteria', activeCriteria)
    const validationResult = criteriaValidation(activeCriteria)
    // green('CriteriaResults: validationResults', validationResult)

    if (isNilOrEmpty(activeCriteria)) {
      dispatch(criteriaResultsClear())
    } else {
      dispatch(fetchCriteriaResults(activeCriteria))
    }
    // }
  }, [criteria, dispatch])

  const criteriaResultsTransactions = useSelector(
    selectCriteriaResultsTransactions
  )


  return (
    <div>
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
