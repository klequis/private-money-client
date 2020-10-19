import { createSlice, createAsyncThunk/*,  current */ } from '@reduxjs/toolkit'
import api from 'api'
import { requestStatus } from 'globalConstants'
// import { logFetchResults } from 'lib/logFetchResults'
import * as R from 'ramda'

// eslint-disable-next-line
import { blue, yellow } from 'logger'

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
    yellow('fetching transactions **')
    const r = await api.views.read(viewName)
    return r
  }
)

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setActiveTransactionId(state, action) {
      state.activeTransactionId = action.payload
    }
  },
  extraReducers: {
    [transactionsFetch.pending]: (state, action) => {
      state.status = requestStatus.pending
      state.items = []
    },
    [transactionsFetch.fulfilled]: (state, action) => {
      // logFetchResults('transactions.fulfilled', state, action)
      state.status = requestStatus.fulfilled
      state.items = action.payload.data
    },
    [transactionsFetch.rejected]: (state, action) => {
      // logFetchResults('transactions.rejected', state, action)
      state.status = requestStatus.error
      state.error = action.error.message
      state.items = []
    },
  }
})

export default transactionsSlice.reducer

export const { setActiveTransactionId } = transactionsSlice.actions

// Selectors
export const selectAllTransactions = (state) => state.transactions.items

export const selectOneTransaction = (transactionId, state) => {
  // blue('selectOneTransaction: transactionId', transactionId)
  const tItems = (R.path(['transactions', 'items'], state))
  // blue('selectOneTransaction: tItems', tItems)
  // return state.transactions.items.find((t) => t._id === transactionId)
  const ret = R.find(R.propEq('_id', transactionId))(tItems)
  // blue('selectOneTransaction: ret', R.type(ret))
  return R.equals(R.type(ret), 'Undefined') ? null : ret
}

export const selectCriteriaResultsTransactions = (state)  => {
  // return state.transactions.filter(t => transactionIds.includes(t._id))
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
  // blue('state', state)
  const tId = selectActiveTransactionId(state)
  // blue('tId', R.type(tId))
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
