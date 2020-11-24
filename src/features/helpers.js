import { current } from '@reduxjs/toolkit'
import * as R from 'ramda'
import { slicePaths } from 'features/selectors'
/**
 *
 * @param {object} state
 * @returns {array} rules.items[...]
 * @summary `state` may be all of Redux state or just the rules slice.
 *   In either case, return just items[...]
 */
const getRulesItems = (state) => {
  return R.has('rules')(state)
    ? R.path(slicePaths.rulesItems, state)
    : R.path(['items'], state)
}

/**
 *
 * @param {string} ruleId
 * @param {object} state
 */
export const getRule = (ruleId, state) => {
  const items = getRulesItems(current(state))
  return items.find((r) => r._id === ruleId)
}

export const getActiveCriteria = (criteria) => {
  return criteria === null ? [] : criteria.filter((c) => c.active === true)
}

export const removeInactiveCriteria = (rule) => {
  const { criteria } = rule
  const activeCriteria = getActiveCriteria(criteria)
  return R.mergeRight(rule, { criteria: activeCriteria })
}

export const removeTmpIdField = (rule) => {
  return R.has('_id') ? R.dissoc('_id', rule) : rule
}

