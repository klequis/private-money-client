import * as R from 'ramda'
import { selectRulesItems } from 'features/selectors'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'

// eslint-disable-next-line
import { grpStart, grpEnd, blue, yellow, red } from 'logger'

// /**
//  *
//  * @param {object} state
//  * @returns {array} rules.items[...]
//  * @summary `state` may be all of Redux state or just the rules slice.
//  *   In either case, return just items[...]
//  */
// const getRulesItems = (state) => {
//   return R.has('rules')(state)
//     ? R.path(selectRulesItems.rulesItems, state)
//     : R.path(['items'], state)
// }

/**
 *
 * @param {string} ruleId a mongodb ObjectId or a tmp id tmp_*
 * @param {object} state state
 * @returns {object} a rule
 */
export const getRule = (ruleId, state) => {
  const items = selectRulesItems(state)
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

/**
 *
 * @param {any} value should be array, empty array, null, undefined but also '' or {}
 * @returns {Array} returns value if it is a non-empty array or [] for an empty array, undefined, null, etc
 */
export const valueOrEmptyArray = (value) => (isNilOrEmpty(value) ? [] : value)

/**
 *
 * @param {any} value  should be object, empty object, null, undefined but also '' or  {}
 * @returns {object} returns value if it is a non-empty object or {} for an empty object, undefined, null, etc
 */
export const valueOrEmptyObject = (value) => (isNilOrEmpty(value) ? {} : value)

/**
 *
 * @param {any} value  should be string, empty string, null, undefined but also {} or []
 * @returns {object} returns value if it is a non-empty string or '' for an empty string, undefined, null, etc
 */
export const valueOrEmptyString = (value) => (isNilOrEmpty(value) ? '' : value)

/**
 *
 * @param {string} root name of path root such as 'tx' or 'rules'
 * @param {Array} path full path to desirec values
 * @param {state} state current state with or without root property
 * @returns {any} returns whatever is in state
 */
export const getStateValue = (root, path, state) => {
  const ret = R.has(root)(state)
    ? R.path(path, state)
    : R.path(path, R.tail(state))
  if (R.equals(path, ['criteriaResults', 'fetch', 'status'])) {
    grpStart('getStateValue')
    blue('root', root)
    blue('path', path)
    blue('state', state)
    blue('ret', ret)
    grpEnd()
  }
  return ret
}

/**
 *
 * @param {string} root name of path root such as 'tx' or 'rules'
 * @param {Array} path full path to desirec values
 * @param {any} newValue the new value to set for the specified path state
 * @param {state} state current state with or without root property
 * @returns {any} returns whatever is in state
 */
export const setStateValue = (root, path, newValue, state) => {
  const actualPath = R.has(root) ? path : R.tail(path)
  const ret = R.assocPath(actualPath, newValue, state)
  red('WHAT DOES THIS RETURN setStateValue: ret', ret)
  return ret
}
