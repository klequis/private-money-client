import { createSlice, createAsyncThunk,  current } from '@reduxjs/toolkit'
import api from 'api'
import { requestStatus } from 'globalConstants'

// eslint-disable-next-line
import { yellow } from 'logger'

const initialState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchCriteriaResults = createAsyncThunk(
  'criteriaResult/get',
  async (criteria) => {
    yellow('fetchCriteriaResults: criteria', criteria)
    const r = await api.transactions.read(criteria)
    return r
  }
)

const criteriaResultsSlice = createSlice({
  name: 'criteriaResult',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchCriteriaResults.pending]: (state, action) => {
      console.group('fetchCriteriaResults.pending')
      yellow('state', current(state))
      yellow('action', action)
      console.groupEnd()
      state.status = requestStatus.pending
    },
    [fetchCriteriaResults.fulfilled]: (state, action) => {
      console.group('fetchCriteriaResults.fulfilled')
      yellow('state', current(state))
      yellow('action', action)
      console.groupEnd()
      state.status = requestStatus.fulfilled
      state.items = action.payload
    },
    [fetchCriteriaResults.rejected]: (state, action) => {
      console.group('fetchCriteriaResults.rejected')
      yellow('state', current(state))
      yellow('action', action)
      console.groupEnd()
      state.status = requestStatus.error
      state.error = action.payload
    }  
  }
})

export default criteriaResultsSlice.reducer

export const selectCriteriaResults = state => state.criteriaResults.items