import React from 'react'
import { useSelector } from 'react-redux'
import CriterionEdit from './CriterionEdit'
import { selectRuleCriteria } from 'features/rules/rulesSlice'
import { selectTmpRuleCriteria } from 'features/rulesTmp/rulesTmpSlice'
import { selectActiveTransaction } from 'features/transactions/transactionsSlice'
import isTmpRule from '../isTmpRule'
import styles from '../Rules.module.css'
import Form from 'react-bootstrap/Form'
import Button from 'components/Button'

// eslint-disable-next-line
import { green, redf, yellow } from 'logger'

const Criteria = ({ ruleId }) => {
  const criteria = useSelector((state) => {
    if (isTmpRule(ruleId)) {
      return selectTmpRuleCriteria(ruleId, state)
    } else {
      return selectRuleCriteria(ruleId, state)
    }
  })
  const activeTransaction = useSelector(selectActiveTransaction)
  const { date } = activeTransaction

  return (
    <>
      <div className="d-flex">
        <h4>Criteria</h4>
        <Button>Add</Button>
      </div>
      <div className={styles.omitAndDateCheck}>
        <Form.Check type="switch" id="this-date-only" label={date} />
        ''
      </div>
      {criteria.map((c) => (
        <CriterionEdit key={c._id} criterion={c} />
      ))}
    </>
  )
}

export default Criteria
