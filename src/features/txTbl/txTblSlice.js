import { createSlice, current } from '@reduxjs/toolkit'
import {
  wdAll,
  wdBoth,
  wdCategorized,
  wdTxTbl,
  pathTxTblRadioHasRuleValue,
  pathTxTblRadioCategorizedDisabled,
  wdUncategorized,
  wdHasRule,
  wdDoesNotHaveRule,
  pathTxTblRadioCategorizedValue,
  pathTxTblFilterProps,
  //
  wdRadioHasRule,
  wdRadioCategorized,
  wdDisabled,
  wdValue,
  wdFilters,
  wdAcctId,
  wdAmount,
  wdCategory1,
  wdCategory2,
  wdDate,
  wdDescription,
  wdType
} from 'appWords'
import { setStateValue, valueOrEmptyString } from 'features/helpers'
import * as R from 'ramda'

// eslint-disable-next-line
import { blue, red } from 'logger'
import { grpStart } from 'logger'
import { grpEnd } from 'logger'

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
  }
}

const radioHasRuleValueSet = R.curry((value, state) => {
  return setStateValue(wdTxTbl, pathTxTblRadioHasRuleValue, value, state)
})

const radioCategorizedDisabledSet = R.curry((value, state) => {
  return setStateValue(wdTxTbl, pathTxTblRadioCategorizedDisabled, value, state)
})

const radioCategorizedValueSet = R.curry((value, state) => {
  return setStateValue(wdTxTbl, pathTxTblRadioCategorizedValue, value, state)
})

const filterUpdate = R.curry((value, path, state) => {
  // grpStart('filterUpdate')
  // blue('value', value)
  // blue('state', state)
  // grpEnd()
  return setStateValue(wdTxTbl, path, value, state)
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
            radioHasRuleValueSet(wdAll),
            radioCategorizedDisabledSet(false)
          )(currState)
        case wdHasRule:
          return R.pipe(
            radioHasRuleValueSet(wdHasRule),
            radioCategorizedDisabledSet(false)
          )(currState)
        case wdDoesNotHaveRule:
          return R.pipe(
            radioHasRuleValueSet(wdDoesNotHaveRule),
            radioCategorizedDisabledSet(true)
          )(currState)
        case wdBoth:
          return radioCategorizedValueSet(wdBoth, currState)
        case wdCategorized:
          return radioCategorizedValueSet(wdCategorized, currState)
        case wdUncategorized:
          return radioCategorizedValueSet(wdUncategorized, currState)
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
      return filterUpdate(finalVal, path, currState)
    }
  }
})

export const txTblReducer = txTblSlice.reducer

export const { updateRadioState, updateFilters } = txTblSlice.actions
