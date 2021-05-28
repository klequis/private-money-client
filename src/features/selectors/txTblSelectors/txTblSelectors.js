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
  pathRadioShowIncomeExpenseValue,
  pathTxTblSelectMonth,
  pathTxTblSelectYear
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
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { notNilOrEmpty } from 'lib/notNilOrEmpty'
import { getMonthIndex } from 'lib/getMonthIndex'
/* eslint-enable */

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

export const selectSelectMonthValue = (state) => {
  return getStateValue(pathTxTblSelectMonth, state)
}

export const selectSelectYearValue = (state) => {
  return getStateValue(pathTxTblSelectYear, state)
}

const _filterYearAndMonth = (state, txItems) => {
  const selectedYear = selectSelectYearValue(state)
  green('selectedYear', selectedYear)
  const selectedMonth = selectSelectMonthValue(state)
  // green('selectedMonth', selectedMonth)

  if (isNilOrEmpty(selectedYear) && isNilOrEmpty(selectedMonth)) {
    green('!')
    return txItems
  }
  if (notNilOrEmpty(selectedYear) && notNilOrEmpty(selectedMonth)) {
    green('yr, mo')
    return txItems.filter((t) => {
      const d = new Date(t.date)
      // console.log('d', d)
      const y = d.getFullYear()
      console.log('y', y)
      const m = d.getMonth()
      // console.log('m', m)
      return (
        y === selectedYear.value && m === getMonthIndex(selectedMonth.value)
      )
    })
  }
  if (notNilOrEmpty(selectedYear) && isNilOrEmpty(selectedMonth)) {
    green('yr')
    return txItems.filter((t) => {
      const d = new Date(t.date)
      const y = d.getFullYear()
      return y === selectedYear
    })
  }

  if (isNilOrEmpty(selectedYear) && notNilOrEmpty(selectedMonth)) {
    green('mo')
    return txItems.filter((t) => {
      const d = new Date(t.date)
      const m = d.getMonth()
      return m === selectedMonth
    })
  }
}

export const selectFilteredTxs = (state) => {
  const txItems = selectTxItems(state)
  // green('txItems', txItems)
  const a = _filterYearAndMonth(state, txItems)
  green('a', a)
  const b = filterTxs(state, a)
  const c = sortTxs(state, b)
  return c
}
