import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import api from 'api'
import { requestStatus } from 'globalConstants'
import { logFetchResults } from 'lib/logFetchResults'
import * as R from 'ramda'

// eslint-disable-next-line
import { blue, yellow, red } from 'logger'

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  activeTransactionId: null,
  criteriaResult: []
}

const viewName = 'all-data-by-description'

export const transactionsFetch = createAsyncThunk(
  'transactions/get',
  async () => {
    const r = await api.views.read(viewName)
    return r
  }
)

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    activeTransactionSet(state, action) {
      logFetchResults('transactions.activeTransactionSet', state, action)
      state.activeTransactionId = action.payload
      
    },
    activeTransactionClear(state, action) {
      logFetchResults('transactions.activeTransactionClear', state, action)
      state.activeTransactionId = null
    },
    setStatusRefresh(state, action) {
      logFetchResults('transactions.setStatusRefresh', state, action)
      state.status = requestStatus.refresh
    }
  },
  extraReducers: {
    [transactionsFetch.pending]: (state, action) => {
      logFetchResults('transactions.pending', state, action)
      state.status = requestStatus.pending
      state.items = []
    },
    [transactionsFetch.fulfilled]: (state, action) => {
      logFetchResults('transactions.fulfilled', state, action)
      state.status = requestStatus.fulfilled
      state.items = action.payload.data
    },
    [transactionsFetch.rejected]: (state, action) => {
      logFetchResults('transactions.rejected', state, action)
      red('transactions.rejected', 'rejected')
      state.status = requestStatus.error
      state.error = action.error.message
      state.items = []
    },
  }
})

export const transactionsReducer = transactionsSlice.reducer
export const { 
  activeTransactionClear,
  activeTransactionSet,
  setStatusRefresh
} = transactionsSlice.actions

// Selectors
export const selectAllTransactions = (state) => state.transactions.items

export const selectOneTransaction = (transactionId, state) => {
  const tItems = (R.path(['transactions', 'items'], state))
  const ret = R.find(R.propEq('_id', transactionId))(tItems)
  return R.equals(R.type(ret), 'Undefined') ? null : ret
}

export const selectCriteriaResultsTransactions = (state)  => {
  const ids = state.criteriaResults.items
  return state.transactions.items.filter(t => ids.includes(t._id))
  
}

export const selectTransactionRuleIds = (transactionId, state) => {
  const transaction = selectOneTransaction(transactionId, state)
  return R.path(['ruleIds'], transaction)
}

export const selectTransactionsStatus = (state) => R.path(['transactions', 'status'], state)
export const selectTransactionsError = (state) => R.path(['transactions', 'error'], state)

export const selectActiveTransactionId = (state) => {
  return R.path(['transactions', 'activeTransactionId'], state) || null
}

export const selectActiveTransaction = state => {
  const tId = selectActiveTransactionId(state)
  return R.type(tId) === 'Null' ? null : selectOneTransaction(tId, state)
}

export const selectTransactionFieldValue = (
  fieldName,
  transactionId,
  state
) => {
  const t = selectOneTransaction(transactionId, state)
  return t[fieldName]
}
