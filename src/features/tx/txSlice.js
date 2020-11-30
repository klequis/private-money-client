/**
 * @module transactionSlice.js
 */

import {
  createSlice,
  createAsyncThunk,
  // eslint-disable-next-line
  current
} from '@reduxjs/toolkit'
import { api } from 'api'
import * as R from 'ramda'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import {
  wdRequestStatusPending,
  wdRequestStatusFulfilled,
  wdRequestStatusError,
  wdRequestStatusFetch,
} from 'appWords'

// eslint-disable-next-line
import { blue, yellow, red } from 'logger'
// eslint-disable-next-line
import { logFetchResults } from 'lib/logFetchResults'

const initialState = {
  activeId: '',
  items: [],
  fetch: {
    status: wdRequestStatusFetch,
    error: null
  }
}

const viewName = 'all-data-by-description'

const addFields = (data) => {
  return R.map((t) => {
    return R.mergeRight(t, {
      hasRule: !isNilOrEmpty(R.prop('ruleIds')(t)),
      hasCategory: !isNilOrEmpty(R.prop('category1')(t))
    })
  }, data)
}

export const txFetch = createAsyncThunk(
  'transactions/get',
  async () => {
    const r = await api.views.read(viewName)
    const { data } = r
    return R.mergeRight(r, { data: addFields(data) })
  }
)

const txSlice = createSlice({
  name: 'tx',
  initialState,
  reducers: {
    txActiveIdSet(state, action) {
      // logFetchResults('transactions.activeTransactionSet', state, action)
      state.activeId = action.payload
    },
    txActiveIdClear(state, action) {
      // logFetchResults('transactions.activeTransactionClear', state, action)
      state.activeId = null
    },
    txFetchStatusSetRefresh(state) {
      // logFetchResults('transactions.setStatusRefresh', state, action)
      state.fetch.status = wdRequestStatusFetch
    },
    txUiRadioHasRuleValueSet(state, action) {
      // wdAll, wdHasRule, wdDoesNotHaveRule
    }
  },
  extraReducers: {
    [txFetch.pending]: (state, action) => {
      // logFetchResults('transactions.pending', state, action)
      state.fetch.status = wdRequestStatusPending
      state.items = []
    },
    [txFetch.fulfilled]: (state, action) => {
      // logFetchResults('transactions.fulfilled', state, action)
      state.fetch.status = wdRequestStatusFulfilled
      state.items = R.path(['payload', 'data'], action)
    },
    [txFetch.rejected]: (state, action) => {
      // logFetchResults('transactions.rejected', state, action)
      red('transactions.rejected', 'rejected')
      state.fetch.status = wdRequestStatusError
      state.error = R.path(['error', 'message'], action)
      state.items = []
    }
  }
})

export const txReducer = txSlice.reducer
export const {
  txActiveIdClear,
  txActiveIdSet,
  txFetchStatusSetRefresh
} = txSlice.actions

