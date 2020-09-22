import { createSlice, createAsyncThunk/*,  current */ } from '@reduxjs/toolkit'
import api from 'api'
import { requestStatus } from 'globalConstants'

// eslint-disable-next-line
// @ts-ignore
import { yellow } from 'logger'

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  activeTransactionId: null,
  criteriaResult: []
}

const viewName = 'all-data-by-description'

export const fetchTransactions = createAsyncThunk(
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
    setActiveTransactionId(state, action) {
      state.activeTransactionId = action.payload
    }
  },
  extraReducers: {
    // @ts-ignore
    [fetchTransactions.pending]: (state, action) => {
      state.status = requestStatus.pending
    },
    // @ts-ignore
    [fetchTransactions.fulfilled]: (state, action) => {
      state.status = requestStatus.fulfilled
      state.items = action.payload
    },
    // @ts-ignore
    [fetchTransactions.rejected]: (state, action) => {
      state.status = requestStatus.error
      state.error = action.error.message
    },
  }
})

export default transactionsSlice.reducer

export const { setActiveTransactionId } = transactionsSlice.actions

// Selectors
export const selectAllTransactions = (state) => state.transactions.items

export const selectOneTransaction = (transactionId, state) => {
  return state.transactions.items.find((t) => t._id === transactionId)
}

export const selectCriteriaResultsTransactions = (state)  => {
  // return state.transactions.filter(t => transactionIds.includes(t._id))
  const ids = state.criteriaResults.items
  return state.transactions.items.filter(t => ids.includes(t._id))
  
}

export const selectTransactionRuleIds = (transactionId, state) => {
  const transaction = selectOneTransaction(transactionId, state)
  return transaction.ruleIds
}

export const selectTransactionsStatus = (state) => state.transactions.status
export const selectTransactionsError = (state) => state.transactions.error

export const selectActiveTransactionId = (state) => state.transactions.activeTransactionId

export const selectActiveTransaction = state => {
  const tId = selectActiveTransactionId(state)
  return selectOneTransaction(tId, state)
}

export const selectTransactionFieldValue = (
  fieldName,
  transactionId,
  state
) => {
  const t = selectOneTransaction(transactionId, state)
  return t[fieldName]
}
