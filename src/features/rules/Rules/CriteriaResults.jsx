import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectRuleEditCriteria } from 'features/rules/rulesSlice'
import {
  fetchCriteriaResults
} from 'features/criteriaResults/criteriaResultsSlice'
import { selectCriteriaResultsTransactions } from 'features/transactions/transactionsSlice'
import isNilOrEmpty from 'lib/isNilOrEmpty'
import BSTable from 'react-bootstrap/Table'
import criteriaValidation from './criteriaValidation'

// eslint-disable-next-line
import { green, redf, yellow } from 'logger'

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Debit</th>
        <th>Credit</th>
        <th>Category 1</th>
        <th>Category 2</th>
      </tr>
    </thead>
  )
}

const getActiveCriteria = (criteria) =>
  criteria === null ? [] : criteria.filter((c) => c.active === true)

const CriteriaResults = () => {
  const [_areCriteriValid, _setAreCriteriaValid] = useState(false)

  const dispatch = useDispatch()
  const criteria = useSelector(selectRuleEditCriteria)

  useEffect(() => {
    if (criteria !== null) {
      const activeCriteria = getActiveCriteria(criteria)
      green('CriteriaResults: activeCriteria', activeCriteria)
      // const validationResult = criteriaValidation(activeCriteria)
      if (!isNilOrEmpty(activeCriteria)) {
        dispatch(fetchCriteriaResults(activeCriteria))
      }
    }
  }, [criteria, dispatch])

  const criteriaResultsTransactions = useSelector(
    selectCriteriaResultsTransactions
  )

  if (criteria === null) {
    return null
  } else {
    return (
      <div>
        {/* <h1 className={styles.sectionTitle}>Transactions</h1>
        <Button>Test</Button> */}
        <BSTable size="sm" variant="dark">
          <TableHead />
          <tbody>
            {criteriaResultsTransactions.map((t) => (
              <tr key={t._id}>
                <td>{t.date}</td>
                <td>{t.description}</td>
                <td>{t.debit}</td>
                <td>{t.credit}</td>
                <td>{t.category1}</td>
                <td>{t.category2}</td>
              </tr>
            ))}
          </tbody>
        </BSTable>
      </div>
    )
  }
}

export default CriteriaResults
