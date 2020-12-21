import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import * as R from 'ramda'
import {
  pathTxTblCheckBoxShowOmitted,
  pathTxTblFilters,
  pathTxTblRadioCategorizedDisabled,
  pathTxTblRadioCategorizedValue,
  pathTxTblRadioHasRuleValue,
  wdHasRule,
  wdCategorized,
  wdAll,
  wdBoth,
  wdTxTbl,
  pathTxTblSortFieldName,
  pathTxTblSortOrder
} from 'appWords'
import { getStateValue } from 'features/helpers'
import { selectTxItems } from 'features/selectors'
import { compareAsc, compareDesc } from 'date-fns'

/* eslint-disable */
import { green, blue, red } from 'logger'
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
  // const { options, filters } = transactionsUi
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

  // const categoryOptValue = R.path(selectorPaths.categorizeRadioValue, options)
  // const categoryOptValue = R.path(selectorPaths.categorizeRadioValue, options)
  // const ruleRadioOption = R.path(selectorPaths.ruleRadioValue, options)
  // const categorizeRadioOption = R.path(
  //   selectorPaths.categorizeRadioValue,
  //   options
  // )
  // const filterByRule =  ruleRadioOption === wdAll ? false : true

  // const ruleRadioValue = R.path(getPath(state, uiPaths.ruleRadioOptionValue), state)
  // const ruleRadioValue = R.path(getPath(state, uiPaths.ruleRadioValue), state)
  const _radioHasRuleValue = selectRadioHasRuleValue(state)
  // const categorizeRadioValue = R.path(getPath(state, uiPaths.categorizeRadioValue), state)
  const _radioCategorizedValue = selectRadioCategorizedValue(state)

  const _filterByRule = _radioHasRuleValue === wdAll ? false : true
  // const filterByCategory = ???  === wdBoth ? false : true
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

  // get return conditions that are not null / empty
  const _conditionFilter = (val) => {
    // let checkedVal
    // if (val === null) {
    //   checkedVal = val
    // } else if (isNilOrEmpty(val.trim())) {
    //   checkedVal = null
    // } else {
    //   checkedVal = val.trimLeft()
    // }
    // return !isNilOrEmpty(checkedVal)
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
    hasRule: R.equals(R.__, selectRadioHasRuleValue(state) === 'hasRule'),
    hasCategory: R.equals(
      R.__,
      selectRadioCategorizedValue(state) === 'categorized'
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

// const compareDateFn = function(sortOrder, a, b){
//   if (sortOrder === 'asc') {
//     return compareAsc(new Date(a), new Date(b))
//   }
  
// }

const _compareDateDesc = function(a, b){
  return compareDesc(new Date(R.prop('dob')(a)), new Date(R.prop('dob')(b)))
}

const _getCompareFn = (sortField, sortOrder) => {
  if (sortField === 'date') {
    if (sortOrder === 'asc') {
      return (a, b) => compareAsc(new Date(a), new Date(b))
    } else {
      return (a, b) => compareDesc(new Date(a), new Date(b))
    }
  } else if (sortField === 'amount') {
    // TODO: return number compare fn
  } else {
    // TODO: return text compare fn
  }
}

const _sortTxItems = R.curry((sortField, sortOrder, items) => {
  const compareFn = _getCompareFn(sortField, sortOrder)
  return R.sort(compareFn, items)
})

const _filterAndSort = (spec, items, sort) => {
  const ret = R.pipe(
    R.filter(R.__, items),
    _sortTxItems(sort.field, sort.order)
  )(spec, items, sort)
  return ret
}

/**
 *
 * @param {object} state state
 * @returns {Array} of filtered transaction objects
 */
export const selectFilteredTx = (state) => {
  const txItems = selectTxItems(state)
  const currentConditions = _makeConditions(state)
  if (isNilOrEmpty(currentConditions)) {
    console.groupEnd()
    return txItems
  }
  const keys = R.keys(currentConditions)
  const tests = _allTests(state)
  const specObj = R.pick(keys, tests)
  // green('specObj', specObj)
  const spec1 = R.where(specObj)
  // green('spec1', spec1)
  const sort = {
    field: selectTxTblSortFieldName(state),
    order: selectTxTblSortOrder(state) 
  }
  const ret = _filterAndSort(spec1, txItems, sort)
  return ret
}


// export const selectFilteredTx = (state) => {
//   const txItems = selectTxItems(state)
//   const currentConditions = makeConditions(state)
//   if (isNilOrEmpty(currentConditions)) {
//     console.groupEnd()
//     return txItems
//   }
//   const keys = R.keys(currentConditions)
//   const tests = allTests(state)
//   const specObj = R.pick(keys, tests)
//   // green('specObj', specObj)
//   const spec1 = R.where(specObj)
//   // green('spec1', spec1)
//   return R.filter(spec1, txItems)
// }
