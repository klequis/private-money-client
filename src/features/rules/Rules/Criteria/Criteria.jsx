import React from 'react'
import { useSelector } from 'react-redux'
import CriterionEdit from './CriterionEdit'
import { selectRuleCriteria } from 'features/rules/rulesSlice'

// eslint-disable-next-line
import { green, redf } from 'logger'

const Criteria = ({ ruleId }) => {

  const criteria = useSelector(state => selectRuleCriteria(ruleId, state))
  
  return criteria.map(c => <CriterionEdit key={c._id} criterion={c} />)
}

export default Criteria
