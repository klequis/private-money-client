import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { getActiveCriteria } from 'features/helpers'
import * as R from 'ramda'
import { valueOrEmptyArray, valueOrEmptyObject } from 'features/helpers'
import {
  // ruleEdit
  pathRuleEdit,
  pathRuleEditActions,
  pathRuleEditCritera,
  pathRuleEditIsDirty,
  pathRuleEditIsTmpRule,
  pathRuleEditHasActionTypeOmit,
  // rules
  pathRulesFetchError,
  pathRulesFetchStatus,
  pathRulesCreateError,
  pathRulesCreateStatus,
  pathRulesItems,
  pathRulesUpdateError,
  pathRulesUpdateStatus,
  wdRules,
  pathRuleEditId,
  wdField,
  wdDescription,
  wdActionType,
  wdCategorize
} from 'appWords'
import { getStateValue } from 'features/helpers'

/* eslint-disable */
import { blue, yellow, grpStart, grpEnd } from 'logger'
/* eslint-enable */

/*
 *  Paths to parts of state
 */

/**
 *
 * @param {*} state state
 * @returns {object} state.ruleEdit
 */
export const selectRuleEdit = (state) => {
  const ruleEdit = getStateValue(pathRuleEdit, state)
  return valueOrEmptyObject(ruleEdit)
}

/**
 *
 * @param {object} state state
 * @returns {Array} state.ruleEdit.actions
 *
 */
export const selectRuleEditActions = (state) => {
  const actions = getStateValue(pathRuleEditActions, state)
  return valueOrEmptyArray(actions)
}

/**
 *
 * @param {object} state state
 * @returns {Array} state.ruleEdit.criteria || []
 */
export const selectRuleEditCriteria = (state) => {
  const criteria = getStateValue(pathRuleEditCritera, state)
  return valueOrEmptyArray(criteria)
}

/**
 *
 * @param {object} state state
 * @returns {boolean} value of state prop
 */
export const selectRuleEidtHasActionTypeOmit = (state) => {
  return getStateValue(pathRuleEditHasActionTypeOmit, state)
}

export const selectRuleEditId = (state) => {
  return getStateValue(pathRuleEditId, state)
}

/**
 *
 * @param {object} state state
 * @returns {boolean} state.ruleEdit.isDirty
 */
export const selectRuleEditIsDirty = (state) => {
  return getStateValue(pathRuleEditIsDirty, state)
}

/**
 *
 * @param {object} state state
 * @returns {boolean} state.ruleEdit.isTmpRule
 */
export const selectRuleEditIsTmpRule = (state) => {
  return getStateValue(pathRuleEditIsTmpRule, state)
}

// export const selectRules =

/**
 *
 * @param {state} state state state
 * @returns {string} a request status word from appWords.js
 */
export const selectRuleCreateError = (state) =>
  getStateValue(pathRulesCreateError, state)

/**
 *
 * @param {state} state state state
 * @returns {string} a request status word from appWords.js
 */
export const selectRuleCreateStatus = (state) =>
  getStateValue(pathRulesCreateStatus, state)

/**
 *
 * @param {state} state state
 * @returns {string} a request status word from appWords.js
 */
export const selectRulesFetchError = (state) => {
  return getStateValue(pathRulesFetchError, state)
}

/**
 *
 * @param {state} state state
 * @returns {string} a request status word from appWords.js
 */
export const selectRulesFetchStatus = (state) => {
  return getStateValue(pathRulesFetchStatus, state)
}

/**
 *
 * @param {state} state state state
 * @returns {Array} state.rules.items
 */
export const selectRulesItems = (state) => {
  return getStateValue(pathRulesItems, state)
}

/**
 *
 * @param {state} state state
 * @returns {string} a request status word from appWords.js
 */
export const selectRuleUpdateError = (state) => {
  return getStateValue(pathRulesUpdateError, state)
}

/**
 *
 * @param {state} state state
 * @returns {string} a request status word from appWords.js
 */
export const selectRuleUpdateStatus = (state) => {
  return getStateValue(pathRulesUpdateStatus, state)
}

/*
 *  Other selectors
 */

/**
 *
 * @param {object} state state
 * @returns {Array} of Criteria objects
 * @description Gets criteria from state.RuleEdit where criteria.active===true
 */
export const selectRuleEditActiveCriteria = (state) => {
  const criteria = getStateValue(pathRuleEditCritera, state)
  if (isNilOrEmpty(criteria)) {
    return []
  }
  const activeCriteria = getActiveCriteria(criteria)
  return valueOrEmptyArray(activeCriteria)
}

/**
 *
 * @param {object} state state
 * @returns {object} state.ruleEdit.actions[fn]
 */
export const selectRuleEditCategorizeAction = (state) => {
  const actions = getStateValue(pathRuleEditActions, state)
  if (isNilOrEmpty(actions)) {
    return null
  }
  return getCategorizeAction(actions)
}

/**
 *
 * @param {object} state state
 * @returns {object} state.ruleEdit.actions[fn]
 */
export const selectRuleEditRenameAction = (state) => {
  const actions = getStateValue(pathRuleEditActions, state)
  if (isNilOrEmpty(actions)) {
    return null
  }
  return R.find(R.propEq(wdField, wdDescription), actions)
}

const getCategorizeAction = (actions) => {
  return R.find(R.propEq(wdActionType, wdCategorize), actions)
}
