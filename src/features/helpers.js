import * as R from 'ramda'
import { selectRulesItems } from 'features/selectors'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { wdId } from 'appWords'
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
 *
 * @param {string} root name of path root such as 'tx' or 'rules'
 * @param {Array} path full path to desirec values
 * @param {state} state current state with or without root property
 * @returns {any} returns whatever is in state
 */
export const getStateValue = (root, path, state) => {
  const ret = R.has(root)(state)
    ? R.path(path, state)
    : R.path(R.tail(path), state)
  return ret
}

/**
 *
 * @param {string} root name of path root such as 'tx' or 'rules'
 * @param {Array} path full path to desirec values
 * @param {any} newValue the new value to set for the specified path state
 * @param {object} state current state with or without root property
 * @returns {any} returns the past in state with the specified value modified
 */
export const createNewState = R.curry((path, newValue, state) => {
  // const isPath = _isPath(path)
  // if (isPath) {
  //   grpStart('setStateValue')
  //   blue('root', root)
  //   blue('path', path)
  //   blue('newValue', newValue)
  //   blue('state', state)
  // }
  const root = path[0]
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
