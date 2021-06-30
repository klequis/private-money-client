import * as R from 'ramda'
import { selectRulesItems } from 'features/selectors'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import {
  wdActive,
  wdFeildsComplete,
  wdId,
  wdIsDirty,
  wdIsTmpRule,
  wdHasActionTypeOmit
} from 'appWords'
import { dataTypes } from 'lib/dataTypes'

// eslint-disable-next-line
import { grpStart, grpEnd, purple, blue, yellow, red } from 'logger'

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
  return R.has(wdId) ? R.dissoc(wdId, rule) : rule
}

export const getCompleteCriteria = (criteria) => {
  return criteria === null
    ? []
    : criteria.filter((c) => c.fieldsComplete === true)
}

export const removeIncompleteCriteria = (rule) => {
  const { criteria } = rule
  const completeCriteria = getCompleteCriteria(criteria)
  return R.mergeRight(rule, { criteria: completeCriteria })
}

export const removeCriterionUIProperties = (rule) => {
  const { criteria } = rule
  const completeCriteria =
    criteria === null
      ? []
      : criteria.map((c) => R.omit([wdActive, wdFeildsComplete], c))
  return R.mergeRight(rule, { criteria: completeCriteria })
}

export const removeRuleUIProperties = (rule) => {
  return R.omit([wdIsTmpRule, wdHasActionTypeOmit, wdIsDirty], rule)
}

export const setCriteriaUIProps = (criteria) => {
  return criteria.map((c) => {
    return { active: true, fieldsComplete: true, ...c }
  })
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
export const valueOrEmptyString = (value) => {
  let finalVal

  if (value === null) {
    finalVal = value
  } else if (isNilOrEmpty(value.trim)) {
    finalVal = null
  } else {
    finalVal = value.trimLeft()
  }
  return isNilOrEmpty(finalVal) ? '' : finalVal
}

/**
 * @param {Array} path full path to desirec values
 * @param {any} newValue the new value to set for the specified path state
 * @param {object} state current state with or without root property
 * @returns {any} returns the passed in state modified with the specified value modified
 */
export const createNewState = R.curry((path, newValue, state) => {
  // const isPath = _isPath(path)
  // if (isPath) {
  // grpStart('setStateValue')
  // blue('path', path)
  // blue('newValue', newValue)
  // blue('state', state)
  // grpEnd()
  // }
  const root = path[0]
  // purple('root', root)
  const actualPath = R.has(root)(state) ? path : R.tail(path)

  // if (isPath) blue('actualPath', actualPath)
  const ret = R.assocPath(actualPath, newValue, state)
  // red('ret', ret)
  // if (isPath) console.assert(ret.ruleEdit.actions.length === 1, 'should be 1 action')
  if (R.type(ret) !== dataTypes.Object) {
    red('hey this return value is not an object', ret)
  }
  // if (isPath) blue('setStateValue: ret', ret)
  // if (isPath) grpEnd()
  return ret
})

/**
 * @param {Array} path full path to desirec values
 * @param {state} state current state with or without root property
 * @returns {any} returns whatever is in state
 */
export const getStateValue = (path, state) => {
  // grpStart('getStateValue')
  // blue('path', path)
  // blue('state', state)
  // grpEnd()
  const root = path[0]
  const ret = R.has(root)(state)
    ? R.path(path, state)
    : R.path(R.tail(path), state)
  return ret
}
