import React from 'react'
import Criteria from './Criteria'
import Actions from './Actions'

const Rule = ({ ruleId }) => {
  return (
    <tr>
      <td colSpan="10">
        <div colSpan="10">{`RuleId: ${ruleId}`}</div>
        <Criteria ruleId={ruleId} />
        <Actions ruleId={ruleId} />
      </td>
    </tr>
  )
}

export default Rule
