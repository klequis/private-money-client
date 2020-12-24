import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { dataTypes } from 'lib/dataTypes'
import * as R from 'ramda'
import {
  pathTxTblCheckBoxShowOmitted,
  pathTxTblFilterProps,
  pathTxTblRadioCategorizedDisabled,
  pathTxTblRadioCategorizedValue,
  pathTxTblRadioHasRuleValue,
  wdHasRule,
  wdCategorized,
  wdAll,
  wdAsc,
  wdBoth,
  wdOmit,
  wdTxTbl,
  pathTxTblFilters,
  pathTxTblSortFieldName,
  pathTxTblSortOrder,
  pathRadioShowIncomeExpenseValue,
} from 'appWords'
import { getStateValue } from 'features/helpers'
import { selectTxItems } from 'features/selectors'
import { txFields } from 'features/tx'

/* eslint-disable */
import { green, blue, red, purple } from 'logger'
import { grpStart } from 'logger'
import { grpEnd } from 'logger'
import { txTblReducer } from 'features/txTbl'
/* eslint-enable */

/**
 *
 * @param {object} state state
 * @returns {string} wdAll | wdHasRule | wdDoesNotHaveRule
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
 * @returns {string} wdBoth | wdCategorized | wdUncategorized
 */
export const selectRadioCategorizedValue = (state) => {
  return getStateValue(wdTxTbl, pathTxTblRadioCategorizedValue, state)
}

/**
 *
 * @param {object} state state
 * @returns {boolean} if disable true else false
 */
export const selectRadioCategorizedDisabled = (state) => {
  return getStateValue(wdTxTbl, pathTxTblRadioCategorizedDisabled, state)
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
 * @param {boolean} filterByRule what it says
 * @param {object} radioHasRuleValue wdAll | wdHasRule | wdDoesNotHaveRule
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

/**
 *
 * @param {boolean} filterByCategory what it says
 * @param {object} radioCategorizedValue wdAll | wdCategorized | wdUncategorized
 * @returns {any} true false or null
 */
const _getHasCategory = (filterByCategory, radioCategorizedValue) => {
  if (!filterByCategory) {
    return null
  }
  if (radioCategorizedValue === wdCategorized) {
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

  const _radioHasRuleValue = selectRadioHasRuleValue(state)
  const _radioCategorizedValue = selectRadioCategorizedValue(state)
  const _filterByRule = _radioHasRuleValue === wdAll ? false : true
  const _filterByCategory = _radioCategorizedValue === wdBoth ? false : true
  const _allConditions = {
    hasRule: _getHasRule(_filterByRule, _radioHasRuleValue),
    hasCategory: _getHasCategory(_filterByCategory, _radioCategorizedValue),
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
    return !isNilOrEmpty(val)
  }
  return R.filter(_conditionFilter, _allConditions)
}

/**
 *
 * @param {object} state state
 * @returns {object} an object of all filter properties with test for each prop
 */
const _allTests = (state) => {
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
      selectRadioCategorizedValue(state) === wdCategorized
    ),
    date: R.test(new RegExp(date, 'i')),
    acctId: R.test(new RegExp(acctId, 'i')),
    description: R.test(new RegExp(description, 'i')),
    amount: R.test(new RegExp(amount, 'i')),
    category1: R.test(new RegExp(category1, 'i')),
    category2: R.test(new RegExp(category2, 'i')),
    type: R.test(new RegExp(type, 'i'))
  }
}

export const selectTxTblSortFieldName = R.curry((state) => {
  return getStateValue(wdTxTbl, pathTxTblSortFieldName, state)
})

export const selectTxTblSortOrder = R.curry((state) => {
  return getStateValue(wdTxTbl, pathTxTblSortOrder, state)
})

const _makeDate = R.curry(value => new Date(value))

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
    const scoreToNum = R.compose(Number, R.prop(sortField));
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
  const currentConditions = _makeConditions(state)
  if (isNilOrEmpty(currentConditions)) {
    return txItems
  } 
  const keys = R.keys(currentConditions)
  const tests = _allTests(state)
  const specObj = R.pick(keys, tests)
  const filterSpec = R.where(specObj)
  return R.filter(filterSpec, txItems)
})

/**
 *
 * @param {object} state state
 * @returns {Array} of filtered transaction objects
 */
export const selectFilteredTx = (state) => {
  const txItems = selectTxItems(state)
  const filteredItems = _filterTx(state, txItems)
  return _sortTx(state, filteredItems)
}

export const selectTxTblFilterValue = (filterName, state) => {
  // The omit field does not have a filter
  return filterName === wdOmit ? '' : getStateValue(wdTxTbl, pathTxTblFilterProps[filterName], state)
}

export const selectRadioShowIncomeExpenseValue = (state) => {
  return getStateValue(wdTxTbl, pathRadioShowIncomeExpenseValue, state)
}