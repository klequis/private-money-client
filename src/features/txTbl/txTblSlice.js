import { createSlice, current } from '@reduxjs/toolkit'
import {
  pathTxTblCheckBoxShowOmitted,
  pathTxTblFilterProps,
  pathTxTblRadioCategorizedDisabled,
  pathTxTblRadioCategorizedValue,
  pathTxTblRadioHasRuleValue,
  wdAcctId,
  wdAll,
  wdBoth,
  wdAmount,
  wdCategorized,
  wdCategory1,
  wdCategory2,
  wdCheckboxShowOmitted,
  wdChecked,
  wdDate,
  wdDescription,
  wdDisabled,
  wdDoesNotHaveRule,
  wdFieldName,
  wdFilters,
  wdHasRule,
  wdRadioHasRule,
  wdRadioCategorized,
  wdSort,
  wdSortOrder,
  wdValue,
  
  wdTxTbl,
  wdType,
  wdUncategorized,
  
} from 'appWords'
import { setStateValue, valueOrEmptyString } from 'features/helpers'
import * as R from 'ramda'

/* eslint-disable */
import { blue, red } from 'logger'
import { grpStart } from 'logger'
import { grpEnd } from 'logger'
/* eslint-enable */

const initialState = {
  [wdRadioHasRule]: {
    [wdValue]: wdAll
  },

  [wdRadioCategorized]: {
    [wdValue]: wdBoth,
    [wdDisabled]: false
  },
  [wdFilters]: {
    [wdAcctId]: null,
    [wdAmount]: null,
    [wdCategory1]: null,
    [wdCategory2]: null,
    [wdDate]: null,
    [wdDescription]: null,
    [wdType]: null
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
  return setStateValue(wdTxTbl, pathTxTblRadioCategorizedDisabled, value, state)
})

const _radioCategorizedValueSet = R.curry((value, state) => {
  return setStateValue(wdTxTbl, pathTxTblRadioCategorizedValue, value, state)
})

const _filterUpdate = R.curry((value, path, state) => {
  // grpStart('filterUpdate')
  // blue('value', value)
  // blue('state', state)
  // grpEnd()
  return setStateValue(wdTxTbl, path, value, state)
})

const _checkboxShowOmittedSet = R.curry((value, state) => {
  return setStateValue(wdTxTbl, pathTxTblCheckBoxShowOmitted, value, state)
})

const txTblSlice = createSlice({
  name: wdTxTbl,
  initialState,
  reducers: {
    updateRadioState(state, action) {
      const { value } = action.payload
      const currState = current(state)
      switch (value) {
        case wdAll:
          return R.pipe(
            _radioHasRuleValueSet(wdAll),
            _radioCategorizedDisabledSet(false)
          )(currState)
        case wdHasRule:
          return R.pipe(
            _radioHasRuleValueSet(wdHasRule),
            _radioCategorizedDisabledSet(false)
          )(currState)
        case wdDoesNotHaveRule:
          return R.pipe(
            _radioHasRuleValueSet(wdDoesNotHaveRule),
            _radioCategorizedDisabledSet(true)
          )(currState)
        case wdBoth:
          return _radioCategorizedValueSet(wdBoth, currState)
        case wdCategorized:
          return _radioCategorizedValueSet(wdCategorized, currState)
        case wdUncategorized:
          return _radioCategorizedValueSet(wdUncategorized, currState)
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
      blue('action', action)
      const { checked } = action.payload
      return _checkboxShowOmittedSet(checked, current(state))
    }
  }
})

export const txTblReducer = txTblSlice.reducer

export const { updateCheckboxShowOmitted, updateRadioState, updateFilters } = txTblSlice.actions
