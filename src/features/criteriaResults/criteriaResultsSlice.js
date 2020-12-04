/**
 * @module criteriaResultsSlice.js
 */

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
import { setStateValue } from 'features/helpers'

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

const itemsSet = R.curry((items, state) => {
  return setStateValue(
    wdCriteriaResults,
    pathCriteriaResultsItems,
    items,
    state
  )
})

const fetchStatusSet = R.curry((status, state) => {
  return setStateValue(
    wdCriteriaResults,
    pathCriteriaResultsFetchStatus,
    status,
    state
  )
})

const fetchErrorSet = R.curry((errorMessage, state) => {
  return setStateValue(
    wdCriteriaResults,
    pathCriteriaResultsFetchError,
    errorMessage,
    state
  )
})

const criteriaResultsSlice = createSlice({
  name: wdCriteriaResults,
  initialState,
  reducers: {
    criteriaResultsClear(state) {
      const currState = current(state)
      itemsSet([], currState)
    }
  },
  extraReducers: {
    [criteriaResultsFetch.pending]: (state) => {
      return R.pipe(
        fetchStatusSet(wdRequestStatusPending),
        itemsSet([])
      )(current(state))
    },
    [criteriaResultsFetch.fulfilled]: (state, action) => {
      const newItems = R.path(['payload', 'data'], action)
      return R.pipe(
        fetchStatusSet(wdRequestStatusFulfilled),
        itemsSet(newItems)
      )(current(state))
    },
    [criteriaResultsFetch.rejected]: (state, action) => {
      const error = R.path(['error', 'message'], action)
      return R.pipe(
        fetchStatusSet(wdRequestStatusError),
        fetchErrorSet(error),
        itemsSet([])
      )(current(state))
    }
  }
})

export const criteriaResultsReducer = criteriaResultsSlice.reducer

export const { criteriaResultsClear } = criteriaResultsSlice.actions
