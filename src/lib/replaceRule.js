import { findIndex, propEq, insert, remove } from 'ramda'

const replaceRule = (newRule, rules) => {
  const { _id } = newRule
  const idx = findIndex(propEq('_id', _id))(rules)
  const newRules = insert(idx, newRule, remove(idx, 1, rules))
  return newRules
}

export default replaceRule
