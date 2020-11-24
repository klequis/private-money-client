import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import * as R from 'ramda'
import { slicePaths } from 'features/selectors'

// export const selectHasRulesChecked = (state) =>
//   R.path(slicePaths.transactionsUiHasRulesChecked, state)
// export const selectIsUncategorizedChecked = (state) =>
//   R.path(slicePaths.transactionsUiIsUncategorizedChecked, state)

/**
 * 
 * @param {object} state 
 */
export const selectOptionState = (state) =>
  R.path(slicePaths.transactionsUiOptions, state)

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
  if (ruleRadioOption === 'hasRule') {
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
  if (categoryOptValue === 'categorized') {
    return true
  }
  return false
}

/**
 *
 * @param {object} transactionsUi
 * @description returns a object with values where allConditions.prop is not null
 */
const makeConditions = (transactionsUi) => {
  const { options, filters } = transactionsUi
  const {
    date,
    acctId,
    description,
    amount,
    category1,
    category2,
    type
  } = filters

  const categoryOptValue = R.path(slicePaths.categorizeRadioValue, options)
  const ruleRadioOption = R.path(slicePaths.ruleRadioValue, options)
  const categorizeRadioOption = R.path(slicePaths.categorizeRadioValue, options)
  const filterByRule = ruleRadioOption === 'all' ? false : true
  const filterByCategory = categorizeRadioOption === 'both' ? false : true

  const allConditions = {
    hasRule: getHasRule(filterByRule, ruleRadioOption),
    hasCategory: getHasCategory(filterByCategory, categoryOptValue),
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
const allTests = (transactionsUi) => {
  const { filters } = transactionsUi
  const {
    date,
    acctId,
    description,
    amount,
    category1,
    category2,
    type
  } = filters
  const ruleRadioOptionValue = R.path(
    ['options', 'ruleRadio', 'value'],
    transactionsUi
  )
  const categorizeRadioOptionValue = R.path(
    ['options', 'categorizeRadio', 'value'],
    transactionsUi
  )

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
 */
export const selectFilteredTransactions = (state) => {
  const { transactionsUi } = state
  const transactions = R.path(slicePaths.transactionsItems, state)
  const currentConditions = makeConditions(transactionsUi)

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
