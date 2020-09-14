import React, { useEffect /*, useState*/ } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import styles from './CreateRules.module.css'
// import Button from 'components/Button'
import { selectRuleEditCriteria } from 'features/rules/rulesSlice'
import {
  fetchCriteriaResults
  // selectCriteriaResults
} from 'features/criteriaResults/criteriaResultsSlice'
import { selectCriteriaResultsTransactions } from 'features/transactions/transactionsSlice'
import isNilOrEmpty from 'lib/isNilOrEmpty'

// eslint-disable-next-line
import { green, redf, yellow } from 'logger'

const getActiveCriteria = (criteria) =>
  criteria === null ? [] : criteria.filter((c) => c.active === true)

const CriteriaResults = () => {
  const dispatch = useDispatch()
  const criteria = useSelector(selectRuleEditCriteria)

  useEffect(() => {
    const c = getActiveCriteria(criteria)
    if (!isNilOrEmpty(c)) {
      dispatch(fetchCriteriaResults(getActiveCriteria(criteria)))
    }
  }, [criteria, dispatch])

  // const criteriaResults = useSelector(selectCriteriaResults)
  // green('CriteriaResults: criteriaResults', criteriaResults)

  const criteriaResultsTransactions = useSelector(
    selectCriteriaResultsTransactions
  )
  green(
    'CriteriaResults: criteriaResultsTransactions',
    criteriaResultsTransactions
  )

  if (criteria === null) {
    return null
  } else {
    return (
      <div>
        {/* <h1 className={styles.sectionTitle}>Transactions</h1>
        <Button>Test</Button> */}
        {criteriaResultsTransactions.map((t) => (
          <div className="d-flex">
            <div className="flex-fill">{t.date}</div>
            <div className="flex-fill">{t.description}</div>
            <div className="flex-fill">{t.category1}</div>
            <div className="flex-fill">{t.category2}</div>
          </div>
        ))}
      </div>
    )
  }
}

export default CriteriaResults
