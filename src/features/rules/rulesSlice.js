import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from 'api'
import { requestStatus } from 'globalConstants'
import * as R from 'ramda'
import { logFetchResults } from 'lib/logFetchResults'

// eslint-disable-next-line
import { blue, red } from 'logger'

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  isEditMode: false
}

export const rulesFetch = createAsyncThunk('rules/get', async () => {
  const r = await api.rules.read()
  return r
})

const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    ruleSave(state, action) {

    }
  },
  extraReducers: {
    [rulesFetch.pending]: (state, action) => {
      // logFetchResults('fetchRules.pending', state, action)      
      state.status = requestStatus.pending
      state.items = []
    },
    [rulesFetch.fulfilled]: (state, action) => {
      // logFetchResults('fetchRules.fulfilled', state, action)      
      state.status = requestStatus.fulfilled
      state.items = action.payload.data
    },
    [rulesFetch.rejected]: (state, action) => {
      // logFetchResults('fetchRules.rejected', state, action)      
      state.status = requestStatus.error
      state.error = action.error.message
      state.items = []
    }
  }
})

// export default rulesSlice.reducer
export const rulesReducer = rulesSlice.reducer

const getRulesItems = (state) =>
  R.has('rules')(state) ? state.rules.items : R.path(['state', 'items'], state)

const getRule = (ruleId, state) =>
  getRulesItems(state).find((r) => r._id === ruleId)

export const selectRulesStatus = (state) => R.path(['state', 'transactions', 'status'], state)

export const selectRulesError = (state) => R.path(['state', 'transactions', 'error'], state)

export const selectRuleCriteria = (ruleId, state) => {
  const { criteria } = getRule(ruleId, state)
  return criteria
}

export const selectRuleActions = (ruleId, state) => {
  const { actions } = getRule(ruleId, state)
  return actions
}

export const selectRule = (ruleId, state) =>
  R.find(R.propEq('_id', ruleId))(R.path(['rules', 'items'], state)) 
