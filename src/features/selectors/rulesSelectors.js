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
  wdRuleUpdateStatus,
  wdRulesItems
  // value
} from 'appWords'

// eslint-disable-next-line
import { blue, grpStart, grpEnd } from 'logger'

export const rulePaths = {
  ruleEditActions: [wdRules, wdRuleEdit, wdActions],
  ruleEditCriteria: [wdRules, wdRuleEdit, wdCriteria],
  ruleEditIsDirty: [wdRules, wdRuleEdit, wdIsDirty],
  ruleEditIsTmpRule: [wdRules, wdRuleEdit, wdIsTmpRule],
  ruleCreateStatus: [wdRules, wdRuleCreateStatus],
  ruleUpdateStatus: [wdRules, wdRuleUpdateStatus],
  rulesFetchStatus: [wdRules, wdRulesFetchStatus],
  rulesItems: [wdRules, wdItems]
}



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
  const path = getPath(state, rulePaths.ruleEditCriteria)
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
  const path = (state, rulePaths.ruleEdit)
  const ruleEdit = R.path(path, state)
  return valueOrEmptyObject(ruleEdit)
}

/**
 *
 * @param {object} state
 * @returns {array} Returns criteria from state.ruleEdit
 */
export const selectRuleEditCriteria = (state) => {
  const path = getPath(state, rulePaths.ruleEditCriteria)
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
  const path = getPath(state, rulePaths.ruleEditActions)
  const actions = R.path(path, state)
  return valueOrEmptyArray(actions)
}

/**
 *
 * @param {object} state
 * @returns {boolean} state.ruleEdit.dirty
 */
export const selectRuleEditIsDirty = (state) => {
  const path = getPath(state, rulePaths.ruleEditIsDirty)
  return R.path(path, state)
}

/**
 *
 * @param {object} state
 * @returns {boolean} state.ruleEdit.isTmpRule
 */
export const selectRuleEditIsTmpRule = (state) => {
  const path = getPath(state, rulePaths.ruleEditIsTmpRule)
  return R.path(path, state)
}

/**
 *
 * @param {object} state
 * @returns {object}
 */
export const selectRuleEditRenameAction = (state) => {
  const path = getPath(state, rulePaths.ruleEditActions)
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
  const actions = R.path(getPath(state, rulePaths.ruleEditActions), state)
  if (isNilOrEmpty(actions)) {
    return null
  }
  const a = getCategorizeAction(actions)

  return a
}



/**
 *
 * @param {state} state
 * @return {string} a request status word from appWords.js
 */
export const selectRulesFetchStatus = (state) =>
  R.path(getPath(state, wdRulesFetchStatus), state)

export const selectRuleCreateStatus = (state) => 
  R.path(getPath(state, wdRuleCreateStatus), state)

export const selectRuleUpdateStatus = state => {
  R.path(getPath(state, wdRuleUpdateStatus))
}

export const selectRulesItems = (state) => {
  R.path(getPath(state, wdRulesItems))
}