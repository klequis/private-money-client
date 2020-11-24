import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import {
  getActiveCriteria,
  getRule
} from 'features/helpers'
import * as R from 'ramda'



export const selectRuleCriteria = (ruleId, state) => {
  const { criteria } = getRule(ruleId, state)
  return criteria
}

export const selectRuleActions = (ruleId, state) => {
  const { actions } = getRule(ruleId, state)
  return actions
}

export const selectRule = (ruleId, state) =>
  R.find(R.propEq('_id', ruleId))(R.path(['rules', 'items'], state))

/**
 *
 * @param {object} state
 * @returns {array}
 * @description Gets criteria from state.RuleEdit where criteria.active===true
 */
export const selectActiveCriteria = (state) => {
  const criteria = R.path(['rules', 'ruleEdit', 'criteria'], state)
  return R.isNil(criteria) ? [] : getActiveCriteria(criteria)
}

/**
 *
 * @param {*} state
 * @return {object} state.ruleEdit
 */
export const selectRuleEdit = (state) => {
  const ruleEdit = R.path(['rules', 'ruleEdit'], state)
  return R.isNil(ruleEdit) ? {} : ruleEdit
}

/**
 *
 * @param {object} state
 * @returns {array} Returns criteria from state.ruleEdit
 */
export const selectRuleEditCriteria = (state) => {
  const criteria = R.path(['rules', 'ruleEdit', 'criteria'], state)
  return R.isNil(criteria) ? [] : criteria
}

/**
 *
 * @param {object} state
 * @returns {array}
 *
 */
export const selectRuleEditActions = (state) => {
  const actions = R.path(['rules', 'ruleEdit', 'actions'], state)
  return R.isNil(actions) ? [] : actions
}

/**
 *
 * @param {object} state
 * @returns {string} state.ruleEdit.dirty
 */
export const selectRuleEditIsDirty = (state) => {
  return R.path(['rules', 'ruleEdit', 'dirty'], state)
}

/**
 *
 * @param {object} state
 * @returns {string} state.ruleEdit.isTmpRule
 */
export const selectRuleEditIsTmpRule = (state) => {
  return R.path(['rules', 'ruleEdit', 'isTmpRule'], state)
}

export const selectRuleEditRenameDescriptionAction = (state) => {
  // blue('state', state)
  const actions = R.path(['rules', 'ruleEdit', 'actions'], state)
  // blue('actions', actions)
  if (isNilOrEmpty(actions)) {
    return null
  }
  const action = R.find(R.propEq('field', 'description'), actions)
  // blue('action', action)
  return action
}
