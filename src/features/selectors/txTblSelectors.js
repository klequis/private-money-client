import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import * as R from 'ramda'
import {
  pathTxTblFilters,
  pathTxTblRadioCategorizedDisabled,
  pathTxTblRadioCategorizedValue,
  pathTxTblRadioHasRuleValue,
  wdHasRule,
  wdCategorized,
  wdAll,
  wdBoth,
  wdTxTbl
} from 'appWords'
import { getStateValue } from 'features/helpers'
import { selectTxItems } from 'features/selectors'
import { green } from 'logger'

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
const selectTxFilters = (state) => {
  return getStateValue(wdTxTbl, pathTxTblFilters, state)
}

/**
 *
 * @param {boolean} filterByRule what it says
 * @param {object} radioHasRuleValue wdAll | wdHasRule | wdDoesNotHaveRule
 * @returns {any} true false or null
 */
const getHasRule = (filterByRule, radioHasRuleValue) => {
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
const getHasCategory = (filterByCategory, radioCategorizedValue) => {
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
const makeConditions = (state) => {
  // const { options, filters } = transactionsUi
  const filters = selectTxFilters(state)
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
  const radioHasRuleValue = selectRadioHasRuleValue(state)
  // const categorizeRadioValue = R.path(getPath(state, uiPaths.categorizeRadioValue), state)
  const radioCategorizedValue = selectRadioCategorizedValue(state)

  const filterByRule = radioHasRuleValue === wdAll ? false : true
  // const filterByCategory = ???  === wdBoth ? false : true
  const filterByCategory = radioCategorizedValue === wdBoth ? false : true

  const allConditions = {
    hasRule: getHasRule(filterByRule, radioHasRuleValue),
    hasCategory: getHasCategory(filterByCategory, radioCategorizedValue),
    date,
    acctId,
    description,
    amount,
    category1,
    category2,
    type
  }

  // get return conditions that are not null / empty
  const conditionFilter = (val) => !isNilOrEmpty(val)
  return R.filter(conditionFilter, allConditions)
}

/**
 *
 * @param {object} state state
 * @returns {object} an object of all filter properties with test for each prop
 */
const allTests = (state) => {
  const filters = selectTxFilters(state)
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

/**
 *
 * @param {object} state state
 * @returns {Array} of filtered transaction objects
 */
export const selectFilteredTx = (state) => {
  const transactions = selectTxItems(state)
  const currentConditions = makeConditions(state)
  if (isNilOrEmpty(currentConditions)) {
    console.groupEnd()
    return transactions
  }
  const keys = R.keys(currentConditions)
  const tests = allTests(state)
  const specObj = R.pick(keys, tests)
  green('specObj', specObj)
  const spec1 = R.where(specObj)
  return R.filter(spec1, transactions)
}
