import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { dataTypes } from 'lib/dataTypes'
import * as R from 'ramda'
import {
  pathTxTblCheckBoxShowOmitted,
  pathTxTblFilterProps,
  pathTxTblRadioHasCategoryDisabled,
  pathTxTblRadioHasCategoryValue,
  pathTxTblRadioHasRuleValue,
  wdHasRule,
  wdAsc,
  wdBoth,
  wdOmit,
  wdShowExpenseOnly,
  wdShowIncomeOnly,
  wdTxTbl,
  pathTxTblFilters,
  pathTxTblSortFieldName,
  pathTxTblSortOrder,
  pathRadioShowIncomeExpenseValue,
  wdHasCategory
} from 'appWords'
import { getStateValue } from 'features/helpers'
import { selectTxItems } from 'features/selectors'
import { txFields } from 'features/tx'

/* eslint-disable */
import { green, blue, red, purple } from 'logger'
import { grpStart } from 'logger'
import { grpEnd } from 'logger'
import { txTblReducer } from 'features/txTbl'
import { yellow } from 'logger'
import { notNilOrEmpty } from 'lib/notNilOrEmpty'
/* eslint-enable */

/**
 *
 * @param {object} state state
 * @returns {string} wdBoth | wdHasRule | wdDoesNotHaveRule
 */
export const selectRadioHasRuleValue = (state) => {
  return getStateValue(wdTxTbl, pathTxTblRadioHasRuleValue, state)
}

/**
 *
 * @param {object} state state
 * @returns {boolean} value of checkbox
 */
export const selectCheckboxShowOmittedValue = (state) => {
  return getStateValue(wdTxTbl, pathTxTblCheckBoxShowOmitted, state)
}

/**
 *
 * @param {object} state state
 * @returns {string} wdBoth | wdHasCategory | wdNoCategory
 */
export const selectRadioHasCategoryValue = (state) => {
  return getStateValue(wdTxTbl, pathTxTblRadioHasCategoryValue, state)
}

/**
 *
 * @param {object} state state
 * @returns {boolean} if disable true else false
 */
export const selectRadioHasCategoryDisabled = (state) => {
  return getStateValue(wdTxTbl, pathTxTblRadioHasCategoryDisabled, state)
}

/**
 *
 * @param {*} state state
 * @returns {object} txTbl.filters
 */
const _selectTxFilters = (state) => {
  return getStateValue(wdTxTbl, pathTxTblFilters, state)
}

/**
 *
 * @param {boolean} filterByCategory what it says
 * @param {object} radioCategorizedValue wdBoth | wdHasCategory | wdNoCategory
 * @returns {any} true false or null
 */
const _getHasCategory = (filterByCategory, radioCategorizedValue) => {
  if (!filterByCategory) {
    return null
  }
  if (radioCategorizedValue === wdHasCategory) {
    return true
  }
  return false
}

/**
 *
 * @param {object} state txTblSlice
 * @description returns a object with values where allConditions.prop is not null
 * @returns {unknown} don't know
 */
const _makeConditions = (state) => {
  const filters = _selectTxFilters(state)
  const {
    date,
    acctId,
    description,
    amount,
    category1,
    category2,
    type
  } = filters

  // rule
  const _radioHasRuleValue = selectRadioHasRuleValue(state)
  const _filterByRule = _radioHasRuleValue === wdBoth ? false : true

  // category
  const _radioCategorizedValue = selectRadioHasCategoryValue(state)
  const _filterByCategory = _radioCategorizedValue === wdBoth ? false : true

  // income / expense
  const _radioShowIncomeExpenseValue = selectRadioShowIncomeExpenseValue(state)
  const _filterByIncomeOnly =
    _radioShowIncomeExpenseValue === wdShowIncomeOnly ? true : false
  const _filterByExpenseOnly =
    _radioShowIncomeExpenseValue === wdShowExpenseOnly ? true : false
  grpStart('_makeConditions')
  // blue('_filterByIncomeOnly', _filterByIncomeOnly)
  // blue('_filterByExpenseOnly', _filterByExpenseOnly)

  const _allConditions = {
    hasRule: _getHasRule(_filterByRule, _radioHasRuleValue),
    hasCategory: _getHasCategory(_filterByCategory, _radioCategorizedValue),
    incomeOnly: _filterByIncomeOnly,
    expenseOnly: _filterByExpenseOnly,
    date,
    acctId,
    description,
    amount,
    category1,
    category2,
    type
  }
  // TODO: looks like _conditionFilter could be inline with R.filter

  const _conditionFilter = (val) => {
    // return !isNilOrEmpty(val)
    return val === true
  }
  // blue('_conditionFilter', _conditionFilter)

  // filteredConditions, e.g.,  { hasRule: true, date: true } only true values
  const filteredConditions = R.filter(_conditionFilter, _allConditions)
  blue('filteredConditions', filteredConditions)
  // array of strings, e.g., [ 'hasRule', 'date' ]
  const keys = R.keys(filteredConditions)
  blue('keys', keys)
  grpEnd()
  return keys
}

/**
 *
 * @param {object} state redux state
 * @returns {Array} prop names as array of strings
 */
const _getPropsToTest = (state) => {
  const {
    date,
    acctId,
    description,
    amount,
    category1,
    category2,
    type
  } = _selectTxFilters(state)
  const a = {
    hasRule: selectRadioHasRuleValue(state) !== wdBoth,
    hasCategory: selectRadioHasCategoryValue(state) !== wdBoth,
    date: notNilOrEmpty(date),
    acctId: notNilOrEmpty(acctId),
    description: notNilOrEmpty(description),
    amount:
      selectRadioShowIncomeExpenseValue(state) !== wdBoth ||
      notNilOrEmpty(amount),
    category1: notNilOrEmpty(category1),
    category2: notNilOrEmpty(category2),
    type: notNilOrEmpty(type)
  }
  // filter out false props
  // If passed an object, R.filter will map over the objects props
  // passing to the compare fn the value of each prop and returning a new object.
  // In this case, since the value of each prop is true || false val => val works
  const b = R.filter((val) => val, a)

  // return only the prop names
  const c = R.keys(b)
  green('keys', c)
  return c
}

/**
 *
 * @param {boolean} filterByRule what it says
 * @param {object} radioHasRuleValue wdBoth | wdHasRule | wdDoesNotHaveRule
 * @returns {any} true false or null
 */
const _getHasRule = (filterByRule, radioHasRuleValue) => {
  if (!filterByRule) {
    return null
  }
  if (radioHasRuleValue === wdHasRule) {
    return true
  }
  return false
}

const _isLongerThanZero = (val) => {
  // blue('_isLongerThanZero: val', val)
  return R.type(val) !== 'Undefined' ? val.length > 0 : false
}

const _isShorterThanZero = (val) => {
  // blue('_isShorterThanZero: val', val)
  return R.type(val) !== 'Undefined' ? val.length < 0 : false
}

/* *************************************************** */
/* *************************************************** */

const _createSpecObj = (state) => {
  const {
    date,
    acctId,
    description,
    amount,
    category1,
    category2,
    type
  } = _selectTxFilters(state)

  const allTests = {
    hasRule:
      selectRadioHasRuleValue(state) === wdHasRule
        ? _isLongerThanZero
        : _isShorterThanZero
    // amount:
  }

  return allTests
  // const propsToTest = _getPropsToTest(state)
}

/* *************************************************** */
/* *************************************************** */

const _isGreaterThan = R.curry((value) => {
  red('_isGreaterThan: value', value)
  return R.gt(value, 0)
})

/**
 *
 * @param {object} state state
 * @returns {object} an object of all filter properties with test for each prop
 */
const _allTests = (state) => {
  yellow('state', state)
  const filters = _selectTxFilters(state)
  const {
    date,
    acctId,
    description,
    amount,
    category1,
    category2,
    type
  } = filters

  return {
    hasRule: R.equals(R.__, selectRadioHasRuleValue(state) === wdHasRule),
    hasCategory: R.equals(
      R.__,
      selectRadioHasCategoryValue(state) === wdHasCategory
    ),
    date: R.test(new RegExp(date, 'i')),
    acctId: R.test(new RegExp(acctId, 'i')),
    description: R.test(new RegExp(description, 'i')),
    amount: R.test(new RegExp(amount, 'i')),
    category1: R.test(new RegExp(category1, 'i')),
    category2: R.test(new RegExp(category2, 'i')),
    type: R.test(new RegExp(type, 'i')),
    expenseOnly: R.lt(R.__, 0)
  }
}

export const selectTxTblSortFieldName = R.curry((state) => {
  return getStateValue(wdTxTbl, pathTxTblSortFieldName, state)
})

export const selectTxTblSortOrder = R.curry((state) => {
  return getStateValue(wdTxTbl, pathTxTblSortOrder, state)
})

const _sortTx = R.curry((state, txItems) => {
  const sortField = selectTxTblSortFieldName(state)
  const sortOrder = selectTxTblSortOrder(state)
  if (isNilOrEmpty(sortField) || isNilOrEmpty(sortOrder)) {
    return txItems
  }
  const sortFieldDataType = txFields[sortField].dataType
  if (sortFieldDataType === dataTypes.String) {
    const valueFn = R.compose(R.toLower, R.prop(sortField))
    return sortOrder === wdAsc
      ? R.sort(R.ascend(valueFn))(txItems)
      : R.sort(R.descend(valueFn))(txItems)
  } else if (sortFieldDataType === dataTypes.Number) {
    const scoreToNum = R.compose(Number, R.prop(sortField))
    return sortOrder === wdAsc
      ? R.sortWith([R.ascend(scoreToNum)])(txItems)
      : R.sortWith([R.descend(scoreToNum)])(txItems)
  } else if (sortFieldDataType === dataTypes.Date) {
    const stringToDate = R.compose(_makeDate, R.prop(sortField))
    return sortOrder === wdAsc
      ? R.sortWith([R.ascend(stringToDate)])(txItems)
      : R.sortWith([R.descend(stringToDate)])(txItems)
  } else if (sortFieldDataType === dataTypes.Boolean) {
    return sortOrder === wdAsc
      ? R.sort(R.ascend(R.prop(sortField)))(txItems)
      : R.sort(R.ascend(R.prop(sortField)))(txItems)
  } else {
    throw new Error('txTblSelectors.sortTx - unknown dataType')
  }
})

const _filterTx = R.curry((state, txItems) => {
  // 1. which props have values to test agains
  // done in _createSpecObj const propsToTest = _getPropsToTest(state)
  // 2. get the spec for those props (i.e., get the spec obj)
  // const filterSpec = _createSpecObj(state)
  // blue('filterSpec', filterSpec)
  // 3. R.filter(R.where(spec), txItems)

  // blue('txItems', txItems)
  // return R.filter(R.where(filterSpec), txItems)
  return txItems

  // grpEnd('_filterTx')

  // // currentConditions is the tests that need to be run
  // const currentConditions = _makeConditions(state)
  // blue('currentConditions', currentConditions)
  // if (isNilOrEmpty(currentConditions)) {
  //   return txItems
  // }

  // const tests = _allTests(state)
  // blue('tests', tests)
  // const specObj = R.pick(keys, tests)
  // blue('specObj', specObj)

  // const filterSpec = R.where(specObj)
  // blue('filterSpec', filterSpec)

  // grpEnd()
  // return R.filter(filterSpec, txItems)
})

/**
 *
 * @param {object} state state
 * @returns {Array} of filtered transaction objects
 */
export const selectFilteredTx = (state) => {
  // get all items
  const txItems = selectTxItems(state)
  // filter by text
  const filteredItems = _filterTx(state, txItems)
  // filter by items
  return _sortTx(state, filteredItems)
}

/*

export const selectFilteredTx = (state) => {
  const txItems = selectTxItems(state)
  const filteredItems = _filterTx(state, txItems)
  return _sortTx(state, filteredItems)
}

*/

export const selectTxTblFilterValue = (filterName, state) => {
  // The omit field does not have a filter
  return filterName === wdOmit
    ? ''
    : getStateValue(wdTxTbl, pathTxTblFilterProps[filterName], state)
}

export const selectRadioShowIncomeExpenseValue = (state) => {
  return getStateValue(wdTxTbl, pathRadioShowIncomeExpenseValue, state)
}
