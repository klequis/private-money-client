import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { getActiveCriteria } from 'features/helpers'
import * as R from 'ramda'
import { valueOrEmptyArray, valueOrEmptyObject } from './helpers'
import {
  wdIsDirty,
  wdItems,
  
  wdRuleEdit,
  wdActions,
  wdCriteria,
  wdIsTmpRule,
  wdRuleCreateStatus,
  wdRules,
  wdRulesFetchStatus,
  wdRuleEditActions,
  wdRuleEditCriteria,
  wdRuleEditDirty,
  wdRuleEditIsTmpRule,
  // ruleRadio,
  wdRuleUpdateStatus,
  wdRulesItems
  // value
} from 'appWords'

// eslint-disable-next-line
import { blue, grpStart, grpEnd } from 'logger'
import { green } from 'logger'
import { red } from 'logger'

export const rulePaths = {
  [wdRuleEditActions]: [wdRules, wdRuleEdit, wdActions],
  [wdRuleEditCriteria]: [wdRules, wdRuleEdit, wdCriteria],
  [wdRuleEditDirty]: [wdRules, wdRuleEdit, wdIsDirty],
  [wdRuleEditIsTmpRule]: [wdRules, wdRuleEdit, wdIsTmpRule],
  [wdRuleCreateStatus]: [wdRules, wdRuleCreateStatus],
  [wdRuleUpdateStatus]: [wdRules, wdRuleUpdateStatus],
  [wdRulesFetchStatus]: [wdRules, wdRulesFetchStatus],
  [wdRulesItems]: [wdRules, wdItems]
}



/**
 *
 * @param {object} state
 * @returns {boolean}
 */
const hasRules = (state) => {
  return R.has(wdRules)(state)
}



// so what really is the use of getPath
// called from within this module it should take a word and return a path


/**
 *
 * @param {object} state
 * @param {array} fullPath
 */
const getPath = (state, fullPath) => {
  const ret = hasRules(state) ? fullPath : R.tail(fullPath)
  // grpStart('getPath')
  // blue('hasRules(state)', hasRules(state))
  // blue('state', state)
  // blue('fullPath', fullPath)
  // blue('state.rules.rulesFetchStatus', state.rules.rulesFetchStatus)
  // blue('ret', ret)
  // grpEnd()
  return ret
}

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
export const selectRulesFetchStatus = (state) => {
  return R.path(getPath(state, rulePaths.rulesFetchStatus), state)
}

export const selectRuleCreateStatus = (state) => 
  R.path(getPath(state, rulePaths.ruleCreateStatus), state)

export const selectRuleUpdateStatus = state => {
  R.path(getPath(state, rulePaths.ruleUpdateStatus))
}

export const selectRulesItems = (state) => {
  R.path(getPath(state, rulePaths.ruleItems))
}

