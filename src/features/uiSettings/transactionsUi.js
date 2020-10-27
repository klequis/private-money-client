import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import * as R from 'ramda'

// eslint-disable-next-line
import { blue } from 'logger'

const initialState = {
  hasRules: {
    checked: false,
    enabled: true
  },
  isUncategorized: {
    checked: false,
    enabled: true
  }
}

const transactionsUiSlice = createSlice({
  name: 'transactionsUi',
  initialState,
  reducers: {
    isUncategorizedToggle(state) {
      state.isUncategorized.checked = !state.isUncategorized.checked
    },
    hasRulesToggle(state) {
      state.hasRules.checked = !state.hasRules.checked
    }
    // hasRulesOn(state, action) {
    //   
    // },
    // hasRulesOff(state, action) {
    //   state.hasRules.checked = false
    // },
    // hasCategoryOn(state, action) {
    //   state.hasCategory.checked = true
    // },
    // hasCategoryOff(state, action) {
    //   state.hasCategory.checked = false
    // }
  }
})

export const transactionsUiReducer = transactionsUiSlice.reducer

export const {
  // hasRulesOff,
  // hasRulesOn,
  // hasCategoryOn,
  // hasCategoryOff
  isUncategorizedToggle,
  hasRulesToggle
} = transactionsUiSlice.actions

export const selectHasRulesChecked = (state) => R.path(['transactionsUi', 'hasRules', 'checked'], state)
export const selectIsUncategorizedChecked = (state) => R.path(['transactionsUi', 'isUncategorized', 'checked'], state)