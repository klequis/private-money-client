import React, { useEffect/*, useState*/ } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import styles from './CreateRules.module.css'
// import Button from 'components/Button'
import { selectRuleEditCriteria } from 'features/rules/rulesSlice'
import { fetchCriteriaResult, selectCriteriaResult } from 'features/transactions/transactionsSlice'
import isNilOrEmpty from 'lib/isNilOrEmpty'

// eslint-disable-next-line
import { green, redf, yellow } from 'logger'

const getActiveCriteria = (criteria) => {
  green('getActiveCriteria: criteria')
  return criteria === null ? [] : criteria.filter(c => c.active === true)
}

const CriteriaResults = () => {
  const dispatch = useDispatch()
  const criteria = useSelector(selectRuleEditCriteria)
  green('criteria', criteria)

  // const [_criteriaResults, _setCriteriaResults] = useState(null)

  useEffect(() => {
    const c = getActiveCriteria(criteria)
    green('c', c)
    if (!isNilOrEmpty(c)) {
      dispatch(fetchCriteriaResult(getActiveCriteria(criteria)))
    }
  }, [criteria, dispatch])
  

  

  const criteriaResult = useSelector(selectCriteriaResult)
  green('criteriaResult', criteriaResult)

  if (criteria === null) {
    return null
  } else {
    return (
      <div>
        {/* <h1 className={styles.sectionTitle}>Transactions</h1>
        <Button>Test</Button> */}
        HI
      </div>
    )
  }
  
}

export default CriteriaResults