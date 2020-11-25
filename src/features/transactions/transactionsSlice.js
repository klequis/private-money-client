import {
  createSlice,
  createAsyncThunk,
  // eslint-disable-next-line
  current
} from '@reduxjs/toolkit'
import { api } from 'api'
import * as R from 'ramda'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { requestStatusNames, requestStatusStates } from 'globalConstants'

// eslint-disable-next-line
import { blue, yellow, red } from 'logger'
// eslint-disable-next-line
import { logFetchResults } from 'lib/logFetchResults'

const initialState = {
  activeTransactionId: null,
  criteriaResult: [],
  error: null,
  items: [],
  [requestStatusNames.transactionsFetchStatus]: requestStatusStates.refresh
}

// const initialStateFn = () => {
//   return {
//     activeTransactionId: null,
//     criteriaResult: [],
//     error: null,
//     items: [],
//     [requestStatusNames.transactionsFetchStatus]: requestStatusStates.refresh
//   }
// }

const viewName = 'all-data-by-description'

const addFields = (data) => {
  return R.map((t) => {
    return R.mergeRight(t, {
      hasRule: !isNilOrEmpty(R.prop('ruleIds')(t)),
      hasCategory: !isNilOrEmpty(R.prop('category1')(t))
    })
  }, data)
}

export const transactionsFetch = createAsyncThunk(
  'transactions/get',
  async () => {
    const r = await api.views.read(viewName)
    const { data } = r
    return R.mergeRight(r, { data: addFields(data) })
  }
)

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  // initialState: () => initialStateFn(),
  reducers: {
    activeTransactionIdSet(state, action) {
      // logFetchResults('transactions.activeTransactionSet', state, action)
      state.activeTransactionId = action.payload
    },
    activeTransactionIdClear(state, action) {
      // logFetchResults('transactions.activeTransactionClear', state, action)
      state.activeTransactionId = null
    },
    setTransactionsRefresh(state) {
      // logFetchResults('transactions.setStatusRefresh', state, action)
      state.transactionsFetchStatus = requestStatusStates.refresh
    }
  },
  extraReducers: {
    [transactionsFetch.pending]: (state, action) => {
      // logFetchResults('transactions.pending', state, action)
      state.transactionsFetchStatus = requestStatusStates.pending
      state.items = []
    },
    [transactionsFetch.fulfilled]: (state, action) => {
      // logFetchResults('transactions.fulfilled', state, action)
      state.transactionsFetchStatus = requestStatusStates.fulfilled
      state.items = R.path(['payload', 'data'], action)
    },
    [transactionsFetch.rejected]: (state, action) => {
      // logFetchResults('transactions.rejected', state, action)
      // red('transactions.rejected', 'rejected')
      state.transactionsFetchStatus = R.path(['error'], requestStatusStates)
      state.error = R.path(['error', 'message'], action)
      state.items = []
    }
  }
})

export const transactionsReducer = transactionsSlice.reducer
export const {
  activeTransactionIdClear,
  activeTransactionIdSet,
  setTransactionsRefresh
} = transactionsSlice.actions

