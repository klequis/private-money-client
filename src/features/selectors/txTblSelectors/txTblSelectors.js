import * as R from 'ramda'
import {
  pathTxTblCheckBoxShowOmitted,
  pathTxTblFilterProps,
  pathTxTblRadioHasCategoryDisabled,
  pathTxTblRadioHasCategoryValue,
  pathTxTblRadioHasRuleValue,
  wdOmit,
  wdTxTbl,
  pathTxTblSortFieldName,
  pathTxTblSortOrder,
  pathRadioShowIncomeExpenseValue
} from 'appWords'
import { getStateValue } from 'features/helpers'
import { filterTxs } from './filterTxs'
import { selectTxItems } from 'features/selectors'
import { sortTxs } from './sortTxs'

/* eslint-disable */
import { green, blue, red, purple } from 'logger'
import { grpStart } from 'logger'
import { grpEnd } from 'logger'
import { yellow } from 'logger'
/* eslint-enable */

export const selectFilteredTxs = (state) => {
  const txItems = selectTxItems(state)
  const a = filterTxs(state, txItems)
  const b = sortTxs(state, a)
  return b
}

/**
 *
 * @param {object} state state
 * @returns {string} wdBoth | wdHasRule | wdDoesNotHaveRule
 */
export const selectRadioHasRuleValue = (state) => {
  return getStateValue(pathTxTblRadioHasRuleValue, state)
}

/**
 *
 * @param {object} state state
 * @returns {boolean} value of checkbox
 */
export const selectCheckboxShowOmittedValue = (state) => {
  return getStateValue(pathTxTblCheckBoxShowOmitted, state)
}

/**
 *
 * @param {object} state state
 * @returns {string} wdBoth | wdHasCategory | wdNoCategory
 */
export const selectRadioHasCategoryValue = (state) => {
  return getStateValue(pathTxTblRadioHasCategoryValue, state)
}

/**
 *
 * @param {object} state state
 * @returns {boolean} if disable true else false
 */
export const selectRadioHasCategoryDisabled = (state) => {
  return getStateValue(pathTxTblRadioHasCategoryDisabled, state)
}

export const selectTxTblSortFieldName = R.curry((state) => {
  return getStateValue(pathTxTblSortFieldName, state)
})

export const selectTxTblSortOrder = R.curry((state) => {
  return getStateValue(pathTxTblSortOrder, state)
})

export const selectTxTblFilterValue = (filterName, state) => {
  // The omit field does not have a filter
  return filterName === wdOmit
    ? ''
    : getStateValue(pathTxTblFilterProps[filterName], state)
}

export const selectRadioShowIncomeExpenseValue = (state) => {
  return getStateValue(pathRadioShowIncomeExpenseValue, state)
}
