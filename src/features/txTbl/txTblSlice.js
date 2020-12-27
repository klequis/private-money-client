import { createSlice, current } from '@reduxjs/toolkit'
import {
  pathTxTblCheckBoxShowOmitted,
  pathTxTblFilterProps,
  pathTxTblRadioHasCategoryDisabled,
  pathTxTblRadioHasCategoryValue,
  pathTxTblRadioHasRuleValue,
  pathTxTblSort,
  wdAcctId,
  wdBoth,
  wdAmount,
  wdCategory1,
  wdCategory2,
  wdCheckboxShowOmitted,
  wdChecked,
  wdDate,
  wdDescription,
  wdDisabled,
  wdFieldName,
  wdFilters,
  wdHasRule,
  wdRadioHasRule,
  wdSort,
  wdSortOrder,
  wdValue,
  wdTxTbl,
  wdType,
  wdShowExpenseOnly,
  wdShowIncomeOnly,
  wdRadioShowIncomeExpense,
  pathRadioShowIncomeExpenseValue,
  wdHasCategory,
  wdRadioHasCategory,
  wdNoRule,
  wdNoCategory
} from 'appWords'
import { setStateValue, valueOrEmptyString } from 'features/helpers'
import * as R from 'ramda'

/* eslint-disable */
import { blue, red, grpStart, grpEnd } from 'logger'
/* eslint-enable */

const initialState = {
  [wdRadioHasRule]: {
    [wdValue]: wdBoth
  },

  [wdRadioHasCategory]: {
    [wdValue]: wdBoth,
    [wdDisabled]: false
  },
  [wdRadioShowIncomeExpense]: {
    [wdValue]: wdBoth
  },
  [wdFilters]: {
    [wdAcctId]: '',
    [wdAmount]: '',
    [wdCategory1]: '',
    [wdCategory2]: '',
    [wdDate]: '',
    [wdDescription]: '',
    [wdType]: ''
  },
  [wdCheckboxShowOmitted]: {
    [wdChecked]: false
  },
  [wdSort]: {
    [wdFieldName]: '',
    [wdSortOrder]: ''
  }
}

const _radioHasRuleValueSet = R.curry((value, state) => {
  return setStateValue(wdTxTbl, pathTxTblRadioHasRuleValue, value, state)
})

const _radioCategorizedDisabledSet = R.curry((value, state) => {
  return setStateValue(wdTxTbl, pathTxTblRadioHasCategoryDisabled, value, state)
})

const _radioCategorizedValueSet = R.curry((value, state) => {
  return setStateValue(wdTxTbl, pathTxTblRadioHasCategoryValue, value, state)
})

const _radioShowIncomeOrExpenseSet = R.curry((value, state) => {
  return setStateValue(wdTxTbl, pathRadioShowIncomeExpenseValue, value, state)
})

const _filterUpdate = R.curry((value, path, state) => {
  return setStateValue(wdTxTbl, path, value, state)
})

const _checkboxShowOmittedSet = R.curry((value, state) => {
  return setStateValue(wdTxTbl, pathTxTblCheckBoxShowOmitted, value, state)
})

const _sortSet = R.curry((fieldName, sortOrder, state) => {
  return setStateValue(wdTxTbl, pathTxTblSort, { fieldName, sortOrder }, state)
})

const txTblSlice = createSlice({
  name: wdTxTbl,
  initialState,
  reducers: {
    updateRadioHasRule(state, action) {
      const { value } = action.payload
      const currState = current(state)
      switch (value) {
        case wdBoth:
          return R.pipe(
            _radioHasRuleValueSet(wdBoth),
            _radioCategorizedDisabledSet(false)
          )(currState)
        case wdHasRule:
          return R.pipe(
            _radioHasRuleValueSet(wdHasRule),
            _radioCategorizedDisabledSet(false)
          )(currState)
        case wdNoRule:
          return R.pipe(
            _radioHasRuleValueSet(wdNoRule),
            // must set category to both or will get empty table
            _radioCategorizedValueSet(wdBoth),
            _radioCategorizedDisabledSet(true)
          )(currState)
        default:
          throw new Error(`unknown radioHasRule value ${value}`)
      }
    },
    updateRadioHasCategory(state, action) {
      const { value } = action.payload
      const currState = current(state)
      switch (value) {
        case wdBoth:
          return _radioCategorizedValueSet(wdBoth, currState)
        case wdHasCategory:
          return _radioCategorizedValueSet(wdHasCategory, currState)
        case wdNoCategory:
          return _radioCategorizedValueSet(wdNoCategory, currState)
        default:
          throw new Error(`unknown radioCategorized value ${value}`)
      }
    },
    updateRadioShowIncomeOrExpense(state, action) {
      const { value } = action.payload
      const currState = current(state)
      switch (value) {
        case wdBoth:
          return _radioShowIncomeOrExpenseSet(wdBoth, currState)
        case wdShowExpenseOnly:
          return _radioShowIncomeOrExpenseSet(wdShowExpenseOnly, currState)
        case wdShowIncomeOnly:
          return _radioShowIncomeOrExpenseSet(wdShowIncomeOnly, currState)
        default:
          throw new Error(`unknown radio value ${value}`)
      }
    },
    updateFilters(state, action) {
      const { name, value } = action.payload
      // state.filters[name] = valueOrEmptyString(value)
      const path = pathTxTblFilterProps[name]
      const currState = current(state)
      const finalVal = valueOrEmptyString(value)
      return _filterUpdate(finalVal, path, currState)
    },
    updateCheckboxShowOmitted(state, action) {
      const { checked } = action.payload
      return _checkboxShowOmittedSet(checked, current(state))
    },
    updateSort(state, action) {
      const { fieldName, sortOrder } = action.payload
      return _sortSet(fieldName, sortOrder, current(state))
    }
  }
})

export const txTblReducer = txTblSlice.reducer

export const {
  updateCheckboxShowOmitted,
  updateFilters,
  updateSort,
  updateRadioShowIncomeOrExpense,
  updateRadioState,
  updateRadioHasRule,
  updateRadioHasCategory
} = txTblSlice.actions
