import React from 'react'
import { useSelector } from 'react-redux'
import CriterionEdit from './CriterionEdit'
import { selectRuleCriteria } from 'features/rules/rulesSlice'
import { selectTmpRuleCriteria } from 'features/rulesTmp/rulesTmpSlice'
import isTmpRule from '../isTmpRule'

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
  return (
    <>
      <h4>Criteria</h4>

      {criteria.map((c) => (
        <CriterionEdit key={c._id} criterion={c} />
      ))}
    </>
  )
}

export default Criteria
