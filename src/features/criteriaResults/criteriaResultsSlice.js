import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { api } from 'api'
import {
  wdRequestStatusFetch,
  wdRequestStatusPending,
  wdRequestStatusFulfilled,
  wdRequestStatusError,
  wdCriteriaResults,
  pathCriteriaResultsItems,
  pathCriteriaResultsFetchStatus,
  pathCriteriaResultsFetchError
} from 'appWords'
import * as R from 'ramda'
import { createNewState } from 'features/helpers'

/* eslint-disable */
import { blue, yellow } from 'logger'
import { logFetchResults } from 'lib/logFetchResults'
/* eslint-enable */

const initialState = {
  items: [],
  fetch: {
    status: wdRequestStatusFetch,
    error: null
  }
}

export const criteriaResultsFetch = createAsyncThunk(
  'criteriaResult/get',
  async (criteria) => {
    const r = await api.transactions.read(criteria)
    return r
  }
)

const _itemsSet = R.curry((items, state) => {
  return createNewState(pathCriteriaResultsItems, items, state)
})

const _fetchStatusSet = R.curry((status, state) => {
  return createNewState(pathCriteriaResultsFetchStatus, status, state)
})

const _fetchErrorSet = R.curry((errorMessage, state) => {
  return createNewState(pathCriteriaResultsFetchError, errorMessage, state)
})

const criteriaResultsSlice = createSlice({
  name: wdCriteriaResults,
  initialState,
  reducers: {
    criteriaResultsClear(state) {
      const currState = current(state)
      _itemsSet([], currState)
    }
  },
  extraReducers: {
    [criteriaResultsFetch.pending]: (state) => {
      return R.pipe(
        _fetchStatusSet(wdRequestStatusPending),
        _itemsSet([])
      )(current(state))
    },
    [criteriaResultsFetch.fulfilled]: (state, action) => {
      const newItems = R.path(['payload', 'data'], action)
      return R.pipe(
        _fetchStatusSet(wdRequestStatusFulfilled),
        _itemsSet(newItems)
      )(current(state))
    },
    [criteriaResultsFetch.rejected]: (state, action) => {
      const error = R.path(['error', 'message'], action)
      return R.pipe(
        _fetchStatusSet(wdRequestStatusError),
        _fetchErrorSet(error),
        _itemsSet([])
      )(current(state))
    }
  }
})

export const criteriaResultsReducer = criteriaResultsSlice.reducer

export const { criteriaResultsClear } = criteriaResultsSlice.actions
