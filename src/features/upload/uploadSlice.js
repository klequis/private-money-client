import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { api } from 'api'
import * as R from 'ramda'
import {
  wdData,
  wdPayload,
  wdRequestStatusFetch,
  wdRequestStatusFulfilled,
  wdRequestStatusPending,
  wdUpload,
  pathAcctFetchStatus,
  pathAcctFetchError,
  pathAcctItems,
  wdRequestStatusError,
  wdError,
  wdMessage
} from 'appWords'
import { createNewState } from 'features/helpers'
import { selectAcctItems, selectAcctFetchStatus } from 'features/selectors'

/* eslint-disable */
import { blue, yellow, red, purple } from 'logger'
import { logFetchResults } from 'lib/logFetchResults'

/* eslint-enable */

export const acctFetch = createAsyncThunk(
  'accounts/get',
  async (noValuePassed, thunkApi) => {
    const r = await api.accounts.read()
    const { data } = r
    return data
  }
)
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

const uploadSlice = createSlice({
  name: wdUpload,
  initialState,
  reducers: {
    uploadProgressSet(state, action) {
      const payload = R.path([wdUpload], action)
      return state // tmp
    }
  },
  extraReducers: {
    [acctFetch.pending]: (state) => {
      return R.pipe(
        _acctFetchStatusSet(wdRequestStatusPending),
        _itemsSet([])
      )(current(state))
    },
    [acctFetch.fulfilled]: (state, action) => {
      const items = R.path([wdPayload, wdData], action)
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

export const uploadReducer = uploadSlice.reducer
export const { uploadProgressSet } = uploadSlice.actions
