/**
 * @module criteriaResultsSlice.js
 */

import { createSlice, createAsyncThunk/*,  current*/ } from '@reduxjs/toolkit'
import { api } from 'api'
// import {
//   requestStatusNames,
//   requestStatusStates
// } from 'globalConstants'
import {
  wdItems,
  wdError,
  wdCriteriaResultsFetchStatus,
  wdRequestStatusRefresh,
  wdRequestStatusPending,
  wdRequestStatusFulfilled,
  wdRequestStatusError

} from 'appWords'
import * as R from 'ramda'

// eslint-disable-next-line
import { blue, yellow } from 'logger'
// eslint-disable-next-line
import { logFetchResults } from 'lib/logFetchResults'

const initialState = {
  [wdItems]: [],
  [wdCriteriaResultsFetchStatus]: wdRequestStatusRefresh,
  [wdError]: null,
}

export const criteriaResultsFetch = createAsyncThunk(
  'criteriaResult/get',
  async (criteria) => {
    // yellow('fetchCriteriaResults: criteria', criteria)
    const r = await api.transactions.read(criteria)
    return r
  }
)

const criteriaResultsSlice = createSlice({
  name: 'criteriaResult',
  initialState,
  reducers: {
    criteriaResultsClear(state, action) {
      // blue('criteriaResultsClear')
      state.items = []
    }
  },
  extraReducers: {
    [criteriaResultsFetch.pending]: (state, action) => {
      // logFetchResults('fetchCriteriaResults.pending', state, action)
      state.criteriaResultsFetchStatus = wdRequestStatusPending
      state.items = []
    },
    [criteriaResultsFetch.fulfilled]: (state, action) => {
      // logFetchResults('fetchCriteriaResults.fulfilled', state, action)
      state.criteriaResultsFetchStatus = wdRequestStatusFulfilled
      state.items = R.path(['payload', 'data'], action)
    },
    [criteriaResultsFetch.rejected]: (state, action) => {
      // logFetchResults('fetchCriteriaResults.rejected', state, action)
      state.criteriaResultsFetchStatus = wdRequestStatusError
      state.error = R.path(['error', 'message'], action)
      state.items = []
    }  
  }
})

export const criteriaResultsReducer = criteriaResultsSlice.reducer

export const { criteriaResultsClear } = criteriaResultsSlice.actions