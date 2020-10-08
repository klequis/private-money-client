import React from 'react'

import { purple } from 'logger'
const RuleId = ({ ruleId }) => {
  purple('RuleId', 'render')
  // return <div style={{ fontSize: '0.8rem' }}>{`RuleId: ${ruleId}`}</div>
  return <small>{`RuleId: ${ruleId}`}</small>
}

export default RuleId
