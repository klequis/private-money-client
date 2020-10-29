import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import * as R from 'ramda'
import {
  transactionOptionValues as optionValues,
  transactionOptionNames
} from 'globalConstants'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'

// eslint-disable-next-line
import { blue } from 'logger'

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



// const _makeOptionStateUpdate = (name, value, state) => {
//   blue('_makeOptionStateUpdate: state', state)
//   return {
//     [ruleRadio]: {
//       value: R.path(['options', ruleRadio, 'value'], state) // state.ruleRadio.value
//     },
//     [categorizeRadio]: {
//       value: name === categorizeRadio ? value : R.path(['options', categorizeRadio, 'value'], state), // state.categorizeRadio.value,
//       disabled: value === optionValues.doesNotHaveRule ? true : false
//     }
//   }
// }

const valueOrEmptyString = (value) => isNilOrEmpty(value) ? '' : value

const transactionsUiSlice = createSlice({
  name: 'transactionsUi',
  initialState,
  reducers: {
    updateRadioState(state, action) {
      const { name, value } = action.payload
      state.options.ruleRadio.value = name === ruleRadio
        ? value
        : R.path(['options', ruleRadio, 'value'], state) // state.ruleRadio.value
      state.options.categorizeRadio.value = name === categorizeRadio
        ? value
        : R.path(['options', categorizeRadio, 'value'], state) // state.categorizeRadio.value,
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
  hasRulesToggle,
  updateFilters,
  updateRadioState
} = transactionsUiSlice.actions

export const selectHasRulesChecked = (state) => R.path(['transactionsUi', 'hasRules', 'checked'], state)
export const selectIsUncategorizedChecked = (state) => R.path(['transactionsUi', 'isUncategorized', 'checked'], state)
export const selectOptionState = state => R.path(['transactionsUi', 'options'], state)