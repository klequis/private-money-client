import * as R from 'ramda'

import { getStateValue } from 'features/helpers'
import {
  pathTxTblFilters,
  wdBoth,
  wdHasCategory,
  wdHasRule,
  wdShowExpenseOnly,
  wdShowIncomeOnly
} from 'appWords'
import {
  selectRadioHasRuleValue,
  selectRadioHasCategoryValue,
  selectRadioShowIncomeExpenseValue
} from './txTblSelectors'
import { notNilOrEmpty } from 'lib/notNilOrEmpty'

/* eslint-disable */
import { green, blue, red, purple, grpStart, grpEnd, yellow } from 'logger'
/* eslint-enable */

/**
 *
 * @param {*} state state
 * @returns {object} txTbl.filters
 */
const _selectTxFilters = (state) => {
  return getStateValue(pathTxTblFilters, state)
}

/**
 *
 * @param {Array} testsToPick of strings which are prop names
 * @param {object} state all of redux state
 * @returns {Array} array of strings which are tx property names
 */
const pickTests = (testsToPick, state) => {
  const {
    date,
    acctId,
    description,
    amount,
    category1,
    category2,
    type
  } = _selectTxFilters(state)

  const hasRuleValue = selectRadioHasRuleValue(state)
  const hasCategoryValue = selectRadioHasCategoryValue(state)
  // const showIncomeExpenseValue = selectRadioShowIncomeExpenseValue(state)

  const tests = {
    hasRule:
      hasRuleValue === wdHasRule ? R.equals(R.__, true) : R.equals(R.__, false),
    hasCategory:
      hasCategoryValue === wdHasCategory
        ? R.equals(R.__, true)
        : R.equals(R.__, false),
    isExpense: R.equals(R.__, true),
    isIncome: R.equals(R.__, true),
    date: R.test(new RegExp(date, 'i')),
    acctId: R.test(new RegExp(acctId, 'i')),
    description: R.test(new RegExp(description, 'i')),
    amount: R.test(new RegExp(amount, 'i')),
    category1: R.test(new RegExp(category1, 'i')),
    category2: R.test(new RegExp(category2, 'i')),
    type: R.test(new RegExp(type, 'i'))
  }
  return R.pick(testsToPick, tests)
}

const _getTestNames = (state) => {
  const {
    date,
    acctId,
    description,
    amount,
    category1,
    category2,
    type
  } = _selectTxFilters(state)

  const hasRuleValue = selectRadioHasRuleValue(state)
  const hasCategoryValue = selectRadioHasCategoryValue(state)
  const showIncomeExpenseValue = selectRadioShowIncomeExpenseValue(state)

  const a = {
    hasRule: R.not(R.equals(hasRuleValue, wdBoth)),
    hasCategory: R.not(R.equals(hasCategoryValue, wdBoth)),
    isExpense: R.equals(showIncomeExpenseValue, wdShowExpenseOnly),
    isIncome: R.equals(showIncomeExpenseValue, wdShowIncomeOnly),
    date: notNilOrEmpty(date),
    acctId: notNilOrEmpty(acctId),
    description: notNilOrEmpty(description),
    amount: notNilOrEmpty(amount),
    category1: notNilOrEmpty(category1),
    category2: notNilOrEmpty(category2),
    type: notNilOrEmpty(type)
  }
  const b = R.filter((x) => x, a)
  const c = R.keys(b)
  return c
}

export const filterTxs = (state, txItems) => {
  const testNamesToPick = _getTestNames(state)
  if (testNamesToPick.length === 0) {
    return txItems
  }
  const tests = pickTests(testNamesToPick, state)
  return R.filter(R.where(tests), txItems)
}
