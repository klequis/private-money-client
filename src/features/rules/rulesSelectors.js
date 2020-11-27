import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { getActiveCriteria } from 'features/helpers'
import * as R from 'ramda'
import { valueOrEmptyArray, valueOrEmptyObject } from './helpers'
import {
  wdIsDirty,
  wdItems,
  wdRules,
  wdRuleEdit,
  wdActions,
  wdCriteria,
  wdIsTmpRule,
  wdRuleCreateStatus,
  wdRulesFetchStatus,
  // ruleRadio,
  wdRuleUpdateStatus
  // value
} from 'appWords'

// eslint-disable-next-line
import { blue, grpStart, grpEnd } from 'logger'

const paths = {
  ruleEditActions: [wdRules, wdRuleEdit, wdActions],
  ruleEditCriteria: [wdRules, wdRuleEdit, wdCriteria],
  ruleEditIsDirty: [wdRules, wdRuleEdit, wdIsDirty],
  ruleEditIsTmpRule: [wdRules, wdRuleEdit, wdIsTmpRule],
  ruleCreateStatus: [wdRules, wdRuleCreateStatus],
  ruleUpdateStatus: [wdRules, wdRuleUpdateStatus],
  rulesFetchStatus: [wdRules, wdRulesFetchStatus],
  rulesItems: [wdRules, wdItems]
}

export const rulePaths = paths

/**
 *
 * @param {object} state
 * @returns {boolean}
 */
const hasRules = (state) => R.has('rules')(state)

/**
 *
 * @param {object} state
 * @param {array} fullPath
 */
const getPath = (state, fullPath) =>
  hasRules(state) ? fullPath : R.tail(fullPath)

// export const selectRuleCriteria = (ruleId, state) => {
//   const { criteria } = getRule(ruleId, state)
//   return criteria
// }

// export const selectRuleActions = (ruleId, state) => {
//   const { actions } = getRule(ruleId, state)
//   return actions
// }

// export const selectRule = (ruleId, state) =>
//   R.find(R.propEq('_id', ruleId))(R.path(selectorPaths..rulesItems, state))

/**
 *
 * @param {object} state
 * @returns {array}
 * @description Gets criteria from state.RuleEdit where criteria.active===true
 */
export const selectActiveCriteria = (state) => {
  // const path = getPath(state, selectorPaths.ruleEditCriteria, state)
  const path = getPath(state, paths.ruleEditCriteria)
  const criteria = R.path(path, state)
  const activeCriteria = getActiveCriteria(criteria)
  return valueOrEmptyArray(activeCriteria)
}

/**
 *
 * @param {*} state
 * @return {object} state.ruleEdit
 */
export const selectRuleEdit = (state) => {
  const path = (state, paths.ruleEdit)
  const ruleEdit = R.path(path, state)
  return valueOrEmptyObject(ruleEdit)
}

/**
 *
 * @param {object} state
 * @returns {array} Returns criteria from state.ruleEdit
 */
export const selectRuleEditCriteria = (state) => {
  const path = getPath(state, paths.ruleEditCriteria)
  const criteria = R.path(path, state)
  return valueOrEmptyArray(criteria)
}

/**
 *
 * @param {object} state
 * @returns {array}
 *
 */
export const selectRuleEditActions = (state) => {
  const path = getPath(state, paths.ruleEditActions)
  const actions = R.path(path, state)
  return valueOrEmptyArray(actions)
}

/**
 *
 * @param {object} state
 * @returns {boolean} state.ruleEdit.dirty
 */
export const selectRuleEditIsDirty = (state) => {
  const path = getPath(state, paths.ruleEditIsDirty)
  return R.path(path, state)
}

/**
 *
 * @param {object} state
 * @returns {boolean} state.ruleEdit.isTmpRule
 */
export const selectRuleEditIsTmpRule = (state) => {
  const path = getPath(state, paths.ruleEditIsTmpRule)
  return R.path(path, state)
}

/**
 *
 * @param {object} state
 * @returns {object}
 */
export const selectRuleEditRenameAction = (state) => {
  const path = getPath(state, paths.ruleEditActions)
  const actions = R.path(path, state)
  if (isNilOrEmpty(actions)) {
    return null
  }
  const action = R.find(R.propEq('field', 'description'), actions)
  return action
}

const getCategorizeAction = (actions) => {
  return R.find(
    R.propEq('actionType', 'categorize'),
    actions
  )
}

/**
 *
 * @param {object} state
 * @returns {object}
 */
export const selectRuleEditCategorizeAction = (state) => {
  const actions = R.path(getPath(state, paths.ruleEditActions), state)
  if (isNilOrEmpty(actions)) {
    return null
  }
  const a = getCategorizeAction(actions)

  return a
}

/**
 *
 * @param {object} state
 * @return {array} of transaction objects
 */
export const selectCriteriaResults = (state) => {
  // const ids = R.path(selectorPaths.criteriaResultsItems, state)
  const ids = R.path(getPath(state, paths.criteriaResultsItems), state)

  // return R.path(selectorPaths.transactionsItems, state).filter((t) =>
  //   ids.includes(t._id)
  // )
  return R.path(getPath(state, paths.transactions), state).filter((t) =>
    ids.includes(t._id)
  )
}

/**
 *
 * @param {state} state
 * @return {string} a request status word from appWords.js
 */
export const selectRulesFetchStatus = (state) =>
  R.path(getPath(state, wdRulesFetchStatus), state)