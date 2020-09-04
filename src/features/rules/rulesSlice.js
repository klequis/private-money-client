import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import api from 'api'
import { requestStatus } from 'globalConstants'
import shortid from 'shortid'

// eslint-disable-next-line
import { green, red } from 'logger'

const initialState = {
  items: [],
  status: 'idle',
  error: null
}

export const fetchRules = createAsyncThunk('rules/get', async () => {
  const r = await api.rules.read()
  return r
})

const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [fetchRules.pending]: (state, action) => {
      state.status = requestStatus.pending
    },
    [fetchRules.fulfilled]: (state, action) => {
      state.status = requestStatus.fulfilled
      state.items = action.payload
    },
    [fetchRules.rejected]: (state, action) => {
      state.status = requestStatus.pending
      state.error = action.payload
    }
  }
})

export default rulesSlice.reducer


// const transactions = (state) => state.transactions.items

// const rules = (state) => state.rules.items

// const getRuleIds = (transactionId, state) => { 
//   return { ruleIds } = transactions(state).find((t) => t._id === transactionId)
// }

// const getRulesForTransaction = (transactionId, state) => {
//   const ruleIds = getRuleIds(transactionId, state)
//   const matchedRules = R.filter((rule) => R.includes(rule._id, ruleIds), rules(state))
// }

// export const selectCriteria = (transactionId, state) => {
//   return matchedRules.map((r) => {
//     return r.criteria
//   })
// }

// export const selectActions = (transactionId, state) => {
//   const ruleIds = getRuleIds(transactionId, state)

//   const matchedRules = R.filter((rule) => R.includes(rule._id, ruleIds), rules(state))

//   return matchedRules.map((r) => {
//     return r.actions
//   })
// }

const getRule = (ruleId, state) => state.rules.items.find(r => r._id === ruleId)

export const selectRulesStatus = (state) => state.transactions.status
export const selectRulesError = (state) => state.transactions.error

export const selectRuleCriteria = (ruleId, state) => {
  // green('selectRuleCriteria: ruleId', ruleId)
  const { criteria } = getRule(ruleId, state)
  
  // green('selectRuleCriteria: criteria', criteria)
  return criteria
}

export const selectRuleActions = (ruleId, state) => {
  const { actions } = getRule(ruleId, state)
  return actions
}