import { findIndex, propEq, remove } from 'ramda'

const removeRule = (ruleId, rules) => {
  const idx = findIndex(propEq('_id', ruleId))(rules)
  const newRules = remove(idx, 1, rules)
  return newRules
}

export default removeRule