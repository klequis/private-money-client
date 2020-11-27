import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import * as R from 'ramda'
// import { selectorPaths } from 'features/selectors'
import {
  wdAll,
  wdBoth,
  wdCategorized,
  wdHasRule,
  wdOptions,
  wdCategorizeRadio,
  wdCategorizeRadioDisabled,
  wdCategorizeRadioValue,
  wdDisabled,
  wdItems,
  wdRuleRadioValue,
  wdTransactions,
  wdTransactionsItems,
  wdTransactionsUi,
  wdTransactionsUiFilters,
  wdTransactionsUiOptions,
  wdValue,
} from 'appWords'

// export const selectHasRulesChecked = (state) =>
//   R.path(selectorPaths..transactionsUiHasRulesChecked, state)
// export const selectIsUncategorizedChecked = (state) =>
//   R.path(selectorPaths..transactionsUiIsUncategorizedChecked, state)

const paths = {
  [wdTransactionsUiOptions]: [wdTransactionsUi, wdOptions],
  [wdCategorizeRadioDisabled]: [wdTransactionsUi, wdOptions, wdCategorizeRadio, wdDisabled],
  [wdCategorizeRadioValue]: [
    wdTransactionsUi,
    wdOptions,
    wdCategorizeRadio,
    wdValue
  ],
  [wdRuleRadioValue]: [wdTransactionsUi, wdOptions],
  [wdTransactionsItems]: [wdTransactions, wdItems],
  [wdTransactionsUiFilters]: [wdTransactionsUi, wdTransactionsUiFilters]
}

/**
 *
 * @param {state} state
 * @returns {boolean}
 */
const hasTransactionsUi = (state) => R.has(wdTransactionsUi)(state)
/**
 *
 * @param {object} state
 * @param {array} fullPath
 * @description returns path as array with or without slice name as first element
 */
const getPath = (state, fullPath) =>
  hasTransactionsUi(state) ? fullPath : R.tail(fullPath)

/**
 *
 * @param {object} filterByCategory
 * @param {object} categoryOptValue
 * @return {null || true || false}
 */
const getHasRule = (filterByRule, ruleRadioOption) => {
  if (!filterByRule) {
    return null
  }
  if (ruleRadioOption === wdHasRule) {
    return true
  }
  return false
}

/**
 *
 * @param {object} filterByCategory
 * @param {object} categoryOptValue
 * @return {null || true || false}
 */
const getHasCategory = (filterByCategory, categoryOptValue) => {
  if (!filterByCategory) {
    return null
  }
  if (categoryOptValue === wdCategorized) {
    return true
  }
  return false
}

/**
 *
 * @param {object} transactionsUi
 * @description returns a object with values where allConditions.prop is not null
 */
const makeConditions = (state) => {
  // const { options, filters } = transactionsUi
  const filters = R.path(getPath(state, paths.transactionsUiFilters), state)
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


  const ruleRadioValue = R.path(getPath(state, paths.ruleRadioOptionValue), state)
  const categorizeRadioValue = R.path(getPath(state, paths.categorizeRadioValue), state)

  const filterByRule = ruleRadioValue === wdAll ? false : true
  // const filterByCategory = ???  === wdBoth ? false : true
  const filterByCategory = ruleRadioValue === wdBoth ? false : true

  const allConditions = {
    hasRule: getHasRule(filterByRule, ruleRadioValue),
    hasCategory: getHasCategory(filterByCategory, categorizeRadioValue),
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
 * @param {object} transactionsUi
 * @returns {object} an object of all filter properties with test for each prop
 */
const allTests = (state) => {
  const filters = R.path(getPath(state, paths.transactionsUiFilters), state)
  const {
    date,
    acctId,
    description,
    amount,
    category1,
    category2,
    type
  } = filters

  // const ruleRadioOptionValue = R.path(
  //   ['options', 'ruleRadio', 'value'],
  //   transactionsUi
  // )
  const ruleRadioOptionValue = R.path(
    getPath(state, paths.ruleRadioValue),
    state
  )

  // const categorizeRadioOptionValueOLD = R.path(
  //   ['options', 'categorizeRadio', 'value'],
  //   transactionsUi
  // )
  const categorizeRadioOptionValue = R.path(getPath(state, paths.categorizeRadioValue), state)

  return {
    hasRule: R.equals(R.__, ruleRadioOptionValue === 'hasRule'),
    hasCategory: R.equals(R.__, categorizeRadioOptionValue === 'categorized'),
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
 * @param {object} state
 * @returns {array} of filtered transaction objects
 */
export const selectFilteredTransactions = (state) => {
  const { transactionsUi } = state
  const transactions = R.path(getPath(state, paths.transactionsItems), state)
  const currentConditions = makeConditions(state)
  if (isNilOrEmpty(currentConditions)) {
    console.groupEnd()
    return transactions
  }
  const keys = R.keys(currentConditions)
  const tests = allTests(transactionsUi)
  const specObj = R.pick(keys, tests)
  const spec1 = R.where(specObj)
  return R.filter(spec1, transactions)
}

/**
 * 
 * @param {state} state 
 * @return {string} wdAll || wdHasRule || wdDoesNotHaveRule
 */
export const selectRuleRadioValue = (state) => {
  return R.path(getPath(state, wdRuleRadioValue), state)
}

/**
 * 
 * @param {state} state 
 * @return {string} wdBoth || wdCategorized || wdUncategorized
 */
export const selectCategorizeRadioValue = (state) => {
  return R.path(getPath(state, wdCategorizeRadioValue), state)
}

/**
 * 
 * @param {state} state 
 * @return {boolean} true || false
 */
export const selectCategorizeRadioDisabled = (state) => {
  return R.path(getPath(state, wdCategorizeRadioValue), state)
}



