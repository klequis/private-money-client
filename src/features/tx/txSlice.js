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
  wdTx,
  pathTxFetchStatus,
  pathTxFetchError,
  pathTxItems,
  pathTxActiveId
} from 'appWords'

// eslint-disable-next-line
import { blue, yellow, red } from 'logger'
// eslint-disable-next-line
import { logFetchResults } from 'lib/logFetchResults'
import { setStateValue } from 'features/helpers'
import { selectTxFetchStatus } from 'features/selectors'

const initialState = {
  activeId: '',
  items: [],
  fetch: {
    status: wdRequestStatusFetch,
    error: null
  }
}

const viewName = 'all-data-by-description'

/* eslint-disable */

/**
 *
 * @param {string} id id from a txItem _id
 * @returns {(state: object) => object} state with updated value
 */
const activeIdSet = (id) => (state) =>
  setStateValue(wdTx, pathTxActiveId, id, state)

/**
 *
 * @param {Array} items an array of txItem objects
 * @returns {(state: object) => object} state with updated value
 */
const itemsSet = (items) => (state) =>
  setStateValue(wdTx, pathTxItems, items, state) // (state)

/**
 *
 * @param {string} status one of wdRequestStatusPending, wdRequestStatusFulfilled, wdRequestStatusError, wdRequestStatusRefresh
 * @returns {(state: object) => object} state with updated value
 */
const txFetchStatusSet = (status) => (state) =>
  setStateValue(wdTx, pathTxFetchStatus, status, state)

/**
 *
 * @param {string} errorMessage  the error message
 * @returns {(state: object) => object} state with updated value
 */
const txFetchErrorSet = (errorMessage) => (state) =>
  setStateValue(wdTx, pathTxFetchError, errorMessage, state)

/* eslint-enable */

const addFields = (data) => {
  return R.map((t) => {
    return R.mergeRight(t, {
      hasRule: !isNilOrEmpty(R.prop('ruleIds')(t)),
      hasCategory: !isNilOrEmpty(R.prop('category1')(t))
    })
  }, data)
}

export const txFetch = createAsyncThunk('transactions/get', async () => {
  const r = await api.views.read(viewName)
  const { data } = r
  return R.mergeRight(r, { data: addFields(data) })
})

const txSlice = createSlice({
  name: wdTx,
  initialState,
  // TODO: document payload for all
  reducers: {
    txActiveIdSet(state, action) {
      // logFetchResults('transactions.activeTransactionSet', state, action)
      const id = action.payload
      return activeIdSet(id, state)
    },
    txActiveIdClear(state) {
      // logFetchResults('transactions.activeTransactionClear', state, action)
      return activeIdSet(null, state)
    },
    txFetchStatusSetRefresh(state) {
      // logFetchResults('transactions.setStatusRefresh', state, action)
      return txFetchStatusSet(wdRequestStatusFetch, state)
    },
  },
  extraReducers: {
    [txFetch.pending]: (state) => {
      // logFetchResults('transactions.pending', state, action)
      return R.pipe(
        txFetchStatusSet(wdRequestStatusPending),
        itemsSet([])
      )(current(state))
    },
    [txFetch.fulfilled]: (state, action) => {
      // logFetchResults('transactions.fulfilled', state, action)
      const items = R.path(['payload', 'data'], action)
      return R.pipe(
        txFetchStatusSet(wdRequestStatusFulfilled),
        itemsSet(items)
      )(current(state))
    },
    [txFetch.rejected]: (state, action) => {
      // logFetchResults('transactions.rejected', state, action)
      const error = R.path(['error', 'message'], action)
      return R.pipe(
        selectTxFetchStatus(wdRequestStatusError),
        itemsSet([]),
        txFetchErrorSet(error)
      )(current(state))
    }
  }
})

export const txReducer = txSlice.reducer
export const {
  txActiveIdClear,
  txActiveIdSet,
  txFetchStatusSetRefresh
} = txSlice.actions
