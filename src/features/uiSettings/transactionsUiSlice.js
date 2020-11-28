/**
 * @module rulesSlice.js
 */

import { createSlice, current } from '@reduxjs/toolkit'
import * as R from 'ramda'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import {
  wdAll,
  wdRuleRadio,
  wdCategorizeRadio,
  wdDoesNotHaveRule
} from 'appWords'
import { uiPaths } from 'features/selectors'

// eslint-disable-next-line
import { blue, red } from 'logger'

const initialState = {
  options: {
    [wdRuleRadio]: {
      value: wdAll
    },
     
    [wdCategorizeRadio]: {
      value: wdAll,
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

const valueOrEmptyString = (value) => (isNilOrEmpty(value) ? '' : value)

const transactionsUiSlice = createSlice({
  name: 'transactionsUi',
  initialState,
  reducers: {
    updateRadioState(state, action) {
      const { name, value } = action.payload
      state.options.ruleRadio.value =
        name === wdRuleRadio
          ? value
          : R.path(uiPaths.ruleRadioValue, state)
      state.options.categorizeRadio.value =
        name === wdCategorizeRadio
          ? value
          : R.path(uiPaths.pathCategorizeRadioValue, state)
      state.options.categorizeRadio.disabled =
        value === wdDoesNotHaveRule ? true : false
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
