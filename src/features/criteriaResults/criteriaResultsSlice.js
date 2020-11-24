import { createSlice, createAsyncThunk/*,  current*/ } from '@reduxjs/toolkit'
import { api } from 'api'
import { requestStatusStates } from 'features/requestStatus'


// eslint-disable-next-line
import { blue, yellow } from 'logger'
// eslint-disable-next-line
import { logFetchResults } from 'lib/logFetchResults'

const initialState = {
  items: [],
  criteriaResultsStatus: requestStatusStates.idle,
  error: null,
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
      logFetchResults('fetchCriteriaResults.pending', state, action)
      state.criteriaResultsStatus = requestStatusStates.pending
      state.items = []
    },
    [criteriaResultsFetch.fulfilled]: (state, action) => {
      logFetchResults('fetchCriteriaResults.fulfilled', state, action)
      state.criteriaResultsStatus = requestStatusStates.fulfilled
      state.items = action.payload.data
    },
    [criteriaResultsFetch.rejected]: (state, action) => {
      logFetchResults('fetchCriteriaResults.rejected', state, action)
      state.criteriaResultsStatus = requestStatusStates.error
      state.error = action.error.message
      state.items = []
    }  
  }
})

export const criteriaResultsReducer = criteriaResultsSlice.reducer

export const { criteriaResultsClear } = criteriaResultsSlice.actions

export const selectCriteriaResults = state => state.criteriaResults.items