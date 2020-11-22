import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { api } from 'api'
import { requestStatus } from 'globalConstants'
import * as R from 'ramda'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'

// eslint-disable-next-line
import { blue, yellow, red } from 'logger'
// eslint-disable-next-line
import { logFetchResults } from 'lib/logFetchResults'

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  refresh: false,
  activeTransactionId: null,
  criteriaResult: []
}

const viewName = 'all-data-by-description'

const addFields = (data) => {
  return R.map(t => {
    return R.mergeRight(
      t,
      {
        hasRule: !isNilOrEmpty(R.prop('ruleIds')(t)),
        hasCategory: !isNilOrEmpty(R.prop('category1')(t))
      }
    )
  }, data)
}

export const transactionsFetch = createAsyncThunk(
  'transactions/get',
  async () => {
    const r = await api.views.read(viewName)
    const { data } = r
    
    const ret = R.mergeRight(r, { data: addFields(data) })
    return ret
  }
)

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    activeTransactionIdSet(state, action) {

      // logFetchResults('transactions.activeTransactionSet', state, action)
      state.activeTransactionId = action.payload
    },
    activeTransactionClear(state, action) {
      // logFetchResults('transactions.activeTransactionClear', state, action)
      state.activeTransactionId = null
    },
    setRefresh(state, action) {
      // logFetchResults('transactions.setStatusRefresh', state, action)
      // blue('before refresh')
      state.refresh = action.payload
      // blue('after refresh')
    }
  },
  extraReducers: {
    [transactionsFetch.pending]: (state, action) => {
      // logFetchResults('transactions.pending', state, action)
      state.status = requestStatus.pending
      state.items = []
    },
    [transactionsFetch.fulfilled]: (state, action) => {
      // logFetchResults('transactions.fulfilled', state, action)
      state.status = requestStatus.fulfilled
      state.items = R.path(['payload', 'data'], action)
    },
    [transactionsFetch.rejected]: (state, action) => {
      // logFetchResults('transactions.rejected', state, action)
      // red('transactions.rejected', 'rejected')
      state.status = R.path(['error'], requestStatus)
      state.error = R.path(['error', 'message'], action)
      state.items = []
    },
  }
})

export const transactionsReducer = transactionsSlice.reducer
export const {
  activeTransactionClear,
  activeTransactionIdSet,
  setRefresh
} = transactionsSlice.actions

export const selectRefreshStatus = (state) => R.path(['transactions', 'refresh'], state)

// Selectors
export const selectAllTransactions = (state) => state.transactions.items

/**
 * 
 * @param {string} transactionId 
 * @param {object} state 
 */
export const selectOneTransaction = (transactionId, state) => {
  const tItems = (R.path(['transactions', 'items'], state))
  const ret = R.find(R.propEq('_id', transactionId))(tItems)
  return R.equals(R.type(ret), 'Undefined') ? null : ret
}

export const selectCriteriaResultsTransactions = (state) => {
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
  // blue('selectActiveTransaction: tId', tId)
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
