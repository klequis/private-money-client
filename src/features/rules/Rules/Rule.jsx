import React from 'react'
import Criteria from './Criteria'
import Actions from './Actions'
import Categorize from './Categorize'

const Rule = ({ ruleId }) => {
  return (
    <tr>
      <td colSpan="10">
        <div colSpan="10">{`RuleId: ${ruleId}`}</div>
        <div><b>category</b></div>
        <Categorize  />
        <Criteria ruleId={ruleId} />
        <Actions ruleId={ruleId} />
      </td>
    </tr>
  )
}

export default Rule
