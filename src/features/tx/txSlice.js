/**
 * @module transactionSlice.js
 */

import {
  createSlice,
  createAsyncThunk,
  // eslint-disable-next-line
  current
} from '@reduxjs/toolkit'
import { api } from 'api'
import * as R from 'ramda'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import {
  wdRequestStatusPending,
  wdRequestStatusFulfilled,
  wdRequestStatusError,
  wdRequestStatusFetch,
  wdTx,
  pathTxFetchStatus,
  pathTxFetchError,
  pathTxItems,
  pathTxActiveId
} from 'appWords'
import { setStateValue } from 'features/helpers'
import { 
  selectTxFetchStatus, 
  selectCheckboxShowOmittedValue
} from 'features/selectors'

// eslint-disable-next-line
import { blue, yellow, red, purple } from 'logger'
// eslint-disable-next-line
import { logFetchResults } from 'lib/logFetchResults'


const initialState = {
  activeId: '',
  items: [],
  fetch: {
    status: wdRequestStatusFetch,
    error: null
  }
}

const viewName = 'all-data-by-description'

const addFields = (data) => {
  return R.map((t) => {
    return R.mergeRight(t, {
      hasRule: !isNilOrEmpty(R.prop('ruleIds')(t)),
      hasCategory: !isNilOrEmpty(R.prop('category1')(t))
    })
  }, data)
}

export const txFetch = createAsyncThunk(
  'transactions/get', 
  async (noValuePassed, thunkApi) => {
    
    const { getState } = thunkApi
    const state = getState()
    const showOmitted = selectCheckboxShowOmittedValue(state)
    blue('txFetch: showOmitted', showOmitted)
    const r = await api.views.read(viewName, showOmitted)
    const { data } = r
    return R.mergeRight(r, { data: addFields(data) })
  }
)  

const itemsSet = R.curry((items, state) => {
  return setStateValue(wdTx, pathTxItems, items, state)
})

const txFetchStatusSet = R.curry((status, state) => {
  return setStateValue(wdTx, pathTxFetchStatus, status, state)
})

const txFetchErrorSet = R.curry((errorMessage, state) => {
  return setStateValue(wdTx, pathTxFetchError, errorMessage, state)
})

const activeIdSet = R.curry((id, state) => {
  return setStateValue(wdTx, pathTxActiveId, id, state)
})


const txSlice = createSlice({
  name: wdTx,
  initialState,
  // TODO: document payload for all
  reducers: {
    txActiveIdSet(state, action) {
      const currState = current(state)
      const id = action.payload
      return activeIdSet(id, currState) // (currState)
    },
    txActiveIdClear(state) {
      const currState = current(state)
      return activeIdSet(null, currState)
    },
    txFetchStatusSetRefresh(state) {
      const currState = current(state)
      return txFetchStatusSet(wdRequestStatusFetch, currState)
    }
  },
  extraReducers: {
    [txFetch.pending]: (state) => {
      return R.pipe(
        txFetchStatusSet(wdRequestStatusPending),
        itemsSet([])
      )(current(state))
    },
    [txFetch.fulfilled]: (state, action) => {
      const items = R.path(['payload', 'data'], action)
      return R.pipe(
        txFetchStatusSet(wdRequestStatusFulfilled),
        itemsSet(items)
      )(current(state))
    },
    [txFetch.rejected]: (state, action) => {
      const error = R.path(['error', 'message'], action)
      return R.pipe(
        selectTxFetchStatus(wdRequestStatusError),
        itemsSet([]),
        txFetchErrorSet(error)
      )(current(state))
    }
  }
})

export const txReducer = txSlice.reducer
export const {
  txActiveIdClear,
  txActiveIdSet,
  txFetchStatusSetRefresh
} = txSlice.actions
