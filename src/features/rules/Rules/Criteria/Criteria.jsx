import React from 'react'
import { useSelector } from 'react-redux'
import CriterionEdit from './CriterionEdit'
import { selectRuleCriteria, selectRuleEditCriteria } from 'features/rules/rulesSlice'
import isTmpRule from 'lib/isTmpRule'
// import styles from '../Rules.module.css'
// import Form from 'react-bootstrap/Form'
import Button from 'components/Button'

// eslint-disable-next-line
import { green, redf, yellow } from 'logger'

const Criteria = ({ ruleId }) => {
  const criteria = useSelector((state) => {
    if (isTmpRule(ruleId)) {
      return selectRuleEditCriteria(state)
    } else {
      return selectRuleCriteria(ruleId, state)
    }
  })
  
  if (!criteria) {
    return null
  }
  return (
    <>
      <div className="d-flex">
        <h4>Criteria</h4>
        <Button>Add</Button>
      </div>
      {criteria.map((c) => (
        <CriterionEdit key={c._id} criterion={c} />
      ))}
    </>
  )
}

export default Criteria
