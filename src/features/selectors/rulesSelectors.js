import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { getActiveCriteria } from 'features/helpers'
import * as R from 'ramda'
import { valueOrEmptyArray, valueOrEmptyObject } from 'features/helpers'
import {
  wdRules,
  pathRuleEditActions,
  pathRuleEditCritera,
  pathRuleEditIsDirty,
  pathRuleEditIsTmpRule,
  pathRulesFetchStatus,
  pathRulesItems,
  pathRuleEdit,
  pathRulesCreateStatus,
  pathRulesUpdateStatus
} from 'appWords'
import { getStateValue } from 'features/helpers'

// eslint-disable-next-line
import { blue, grpStart, grpEnd } from 'logger'

/**
 *
 * @param {object} state
 * @returns {array}
 * @description Gets criteria from state.RuleEdit where criteria.active===true
 */
export const selectActiveCriteria = (state) => {
  const criteria = getStateValue(wdRules, pathRuleEditCritera, state)
  const activeCriteria = getActiveCriteria(criteria)
  return valueOrEmptyArray(activeCriteria)
}

/**
 *
 * @param {*} state
 * @return {object} state.ruleEdit
 */
export const selectRuleEdit = (state) => {
  const ruleEdit = getStateValue(wdRules, pathRuleEdit, state)
  return valueOrEmptyObject(ruleEdit)
}

/**
 *
 * @param {object} state
 * @returns {array} state.ruleEdit.criteria || []
 */
export const selectRuleEditCriteria = (state) => {
  const criteria = R.path(wdRules, pathRuleEditCritera, state)
  return valueOrEmptyArray(criteria)
}

/**
 *
 * @param {object} state
 * @returns {array} state.ruleEdit.actions
 *
 */
export const selectRuleEditActions = (state) => {
  const actions = getStateValue(wdRules, pathRuleEditActions, state)
  return valueOrEmptyArray(actions)
}

/**
 *
 * @param {object} state
 * @returns {boolean} state.ruleEdit.isDirty
 */
export const selectRuleEditIsDirty = (state) => {
  return getStateValue(wdRules, pathRuleEditIsDirty, state)
}

/**
 *
 * @param {object} state
 * @returns {boolean} state.ruleEdit.isTmpRule
 */
export const selectRuleEditIsTmpRule = (state) => {
  return getStateValue(wdRules, pathRuleEditIsTmpRule, state)
}

/**
 *
 * @param {object} state
 * @returns {object} state.ruleEdit.actions[fn]
 */
export const selectRuleEditRenameAction = (state) => {
  const actions = getStateValue(wdRules, pathRuleEditActions, state)
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
 * @returns {object} state.ruleEdit.actions[fn]
 */
export const selectRuleEditCategorizeAction = (state) => {
  const actions = getStateValue(wdRules, pathRuleEditActions, state)
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
export const selectRulesFetchStatus = (state) => {
  return getStateValue(wdRules, pathRulesFetchStatus, state)

}

/**
 *
 * @param {state} state
 * @return {string} a request status word from appWords.js
 */
export const selectRuleCreateStatus = (state) => 
  getStateValue(wdRules, pathRulesCreateStatus, state)

  /**
 *
 * @param {state} state
 * @return {string} a request status word from appWords.js
 */
export const selectRuleUpdateStatus = state => {
  getStateValue(wdRules, pathRulesUpdateStatus, state)
}

/**
 *
 * @param {state} state
 * @return {array} state.rules.items
 */
export const selectRulesItems = (state) => {
  getStateValue(wdRules, pathRulesItems, state)
}

