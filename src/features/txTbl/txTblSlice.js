import { createSlice, current } from '@reduxjs/toolkit'
import {
  wdAll,
  wdBoth,
  wdCategorized,
  wdTxTbl,
  pathTxTblRadioHasRuleValue,
  pathTxTblRadioCategorizedDisabled,
  wdHasRule,
  wdDoesNotHaveRule,
  pathTxTblRadioCategorizedValue
} from 'appWords'
import { setStateValue, valueOrEmptyString } from 'features/helpers'
import * as R from 'ramda'

// eslint-disable-next-line
import { blue, red } from 'logger'

const initialState = {
  options: {
    radioHasRule: {
      value: wdAll
    },
     
    radioCategorize: {
      value: wdBoth,
      disabled: false
    }
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

const txTblSlice= createSlice({
  name: wdTxTbl,
  initialState,
  reducers: {
    updateRadioState(state, action) {
      const { name, value } = action.payload
      const currState = current(state)
      switch (value) {
        case wdAll:
          return R.pipe(
            setStateValue(wdTxTbl, pathTxTblRadioHasRuleValue, value),
            setStateValue(wdTxTbl, pathTxTblRadioCategorizedDisabled, false)
          )(currState)
        case wdHasRule:
          return R.pipe(
            setStateValue(wdTxTbl, pathTxTblRadioHasRuleValue, value),
            setStateValue(wdTxTbl, pathTxTblRadioCategorizedDisabled, false)
          )
        case wdDoesNotHaveRule:
          return R.pipe(
            setStateValue(wdTxTbl, pathTxTblRadioHasRuleValue, value),
            setStateValue(wdTxTbl, pathTxTblRadioCategorizedDisabled, true)
          )(currState)
        case wdCategorized:
          return setStateValue(wdTxTbl, pathTxTblRadioCategorizedValue, value, currState)

        default:
          throw new Error('unknown radio value')
      }
    }
  },
  updateFilters(state, action) {
    const { name, value } = action.payload
    state.filters[name] = valueOrEmptyString(value)
  },

})

export const txTblReducer = txTblSlice.reducer

export const {
  updateRadioState,
  updateFilters
} = txTblSlice.actions