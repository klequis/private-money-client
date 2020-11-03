// eslint-disable-next-line
import { createSlice, current } from '@reduxjs/toolkit'
import * as R from 'ramda'
import {
  transactionOptionValues as optionValues,
  transactionOptionNames
} from 'globalConstants'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'

// eslint-disable-next-line
import { blue, red } from 'logger'

const { ruleRadio, categorizeRadio } = transactionOptionNames

const initialState = {
  options: {
    [ruleRadio]: {
      value: optionValues.all,
    },
    [categorizeRadio]: {
      value: optionValues.both,
      disabled: false
    },
  },
  filters: {
    acctId: null,
    amount: null,
    category1: null,
    category2: null,
    date: null,
    description: null,
    type: null
  }
}

const valueOrEmptyString = (value) => isNilOrEmpty(value) ? '' : value

const transactionsUiSlice = createSlice({
  name: 'transactionsUi',
  initialState,
  reducers: {
    updateRadioState(state, action) {
      const { name, value } = action.payload
      state.options.ruleRadio.value = name === ruleRadio
        ? value
        : R.path(['options', ruleRadio, 'value'], state)
      state.options.categorizeRadio.value = name === categorizeRadio
        ? value
        : R.path(['options', categorizeRadio, 'value'], state)
      state.options.categorizeRadio.disabled = value === optionValues.doesNotHaveRule
        ? true
        : false
    },
    updateFilters(state, action) {
      const { name, value } = action.payload
      state.filters[name] = valueOrEmptyString(value)
    },

    isUncategorizedToggle(state) {
      state.isUncategorized.checked = !state.isUncategorized.checked
    },
    hasRulesToggle(state) {
      state.hasRules.checked = !state.hasRules.checked
    }
  }
})

export const transactionsUiReducer = transactionsUiSlice.reducer

export const {
  isUncategorizedToggle,
  hasRulesToggle,
  updateFilters,
  updateRadioState
} = transactionsUiSlice.actions

export const selectHasRulesChecked = (state) => R.path(['transactionsUi', 'hasRules', 'checked'], state)
export const selectIsUncategorizedChecked = (state) => R.path(['transactionsUi', 'isUncategorized', 'checked'], state)
export const selectOptionState = state => R.path(['transactionsUi', 'options'], state)

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

  const categoryOptValue = R.path(['categorizeRadio', 'value'], options)
  const ruleRadioOption = R.path(['ruleRadio', 'value'], options)
  const categorizeRadioOption = R.path(['categorizeRadio', 'value'], options)
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
  const conditionFilter = val => !isNilOrEmpty(val)
  return R.filter(conditionFilter, allConditions)
}

/**
 * 
 * @param {object} transactionsUi 
 * 
 * @returns {object} an object of all filter properties with test for each prop
 */
const allTests = transactionsUi => {

  const { filters } = transactionsUi
  const { date, acctId, description, amount, category1, category2, type } = filters
  const ruleRadioOptionValue = R.path(['options', 'ruleRadio', 'value'], transactionsUi)
  const categorizeRadioOptionValue = R.path(['options', 'categorizeRadio', 'value'], transactionsUi)

  return {
    hasRule: R.equals(R.__, ruleRadioOptionValue === 'hasRule'),
    hasCategory: R.equals(R.__, categorizeRadioOptionValue === 'categorized'),
    date: R.test(new RegExp(date, 'i')),
    acctId: R.test(new RegExp(acctId, 'i')),
    description: R.test(new RegExp(description, 'i')),
    amount: R.test(new RegExp(amount, 'i')),
    category1: R.test(new RegExp(category1, 'i')),
    category2: R.test(new RegExp(category2, 'i')),
    type: R.test(new RegExp(type, 'i')),
  }
}

export const selectFilteredTransactions = (state) => {

  const { transactionsUi } = state
  const transactions = R.path(['transactions', 'items'], state)
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
