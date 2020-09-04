import { findIndex, propEq } from 'ramda'

import isTmpRule from 'lib/isTmpRule'

// eslint-disable-next-line
import { green } from 'logger'

const getRuleById = (ruleId, state) => {
  const rules = isTmpRule(ruleId) ? state.ruleTmp : state.rules
  const idx = findIndex(propEq('_id', ruleId))(rules)
  return rules[idx]
}

export default getRuleById