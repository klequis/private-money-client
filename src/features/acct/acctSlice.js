import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { api } from 'api'
import * as R from 'ramda'
import {
  wdData,
  wdPayload,
  wdRequestStatusFetch,
  wdRequestStatusFulfilled,
  wdRequestStatusPending,
  pathAcctFetchStatus,
  pathAcctFetchError,
  pathAcctItems,
  wdRequestStatusError,
  wdError,
  wdMessage,
  wdAcct
} from 'appWords'
import { createNewState } from 'features/helpers'
import { selectAcctFetchStatus } from 'features/selectors'

/* eslint-disable */
import { blue, yellow, red, purple } from 'logger'
import { logFetchResults } from 'lib/logFetchResults'
/* eslint-enable */

export const acctFetch = createAsyncThunk('accounts/get', async () => {
  // blue('acctFetch')
  const r = await api.accounts.read()
  // blue('acctSlice.acctFetch: r', r)
  return r
})

export const rulesFetch = createAsyncThunk('rules/get', async () => {
  return await api.rules.read()
})

const initialState = {
  items: [],
  fetch: {
    status: wdRequestStatusFetch,
    error: null
  }
}

const _acctFetchStatusSet = R.curry((status, state) => {
  return createNewState(pathAcctFetchStatus, status, state)
})

const _acctFetchErrorSet = R.curry((errorMessage, state) => {
  return createNewState(pathAcctFetchError, errorMessage, state)
})

const _itemsSet = R.curry((items, state) => {
  return createNewState(pathAcctItems, items, state)
})

const acctSlice = createSlice({
  name: wdAcct,
  initialState,
  reducers: {},
  extraReducers: {
    [acctFetch.pending]: (state) => {
      return R.pipe(
        _acctFetchStatusSet(wdRequestStatusPending),
        _itemsSet([])
      )(current(state))
    },
    [acctFetch.fulfilled]: (state, action) => {
      const items = R.path([wdPayload, wdData], action)
      // blue('acctSlice.fulfilled: action', action)
      return R.pipe(
        _acctFetchStatusSet(wdRequestStatusFulfilled),
        _itemsSet(items)
      )(current(state))
    },
    [acctFetch.rejected]: (state, action) => {
      const error = R.path([wdError, wdMessage], action)
      return R.pipe(
        selectAcctFetchStatus(wdRequestStatusError),
        _itemsSet([]),
        _acctFetchErrorSet(error)
      )(current(state))
    }
  }
})

export const acctReducer = acctSlice.reducer
