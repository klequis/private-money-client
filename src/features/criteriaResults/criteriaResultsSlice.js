import { createSlice, createAsyncThunk/*,  current*/ } from '@reduxjs/toolkit'
import api from 'api'
import { requestStatus } from 'globalConstants'
import { logFetchResults } from 'lib/logFetchResults'

// @ts-ignore
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
    // yellow('fetchCriteriaResults: criteria', criteria)
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
    // @ts-ignore
    [fetchCriteriaResults.pending]: (state, action) => {
      // logFetchResults('fetchRules.pending', state, action)      
      state.status = requestStatus.pending
    },
    // @ts-ignore
    [fetchCriteriaResults.fulfilled]: (state, action) => {
      // logFetchResults('fetchRules.fulfilled', state, action)      
      state.status = requestStatus.fulfilled
      state.items = action.payload.data
    },
    // @ts-ignore
    [fetchCriteriaResults.rejected]: (state, action) => {
      logFetchResults('fetchRules.rejected', state, action)      
      state.status = requestStatus.error
      state.error = action.error.payload
    }  
  }
})

export default criteriaResultsSlice.reducer

export const selectCriteriaResults = state => state.criteriaResults.items