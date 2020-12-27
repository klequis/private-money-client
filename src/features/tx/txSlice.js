import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
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
  pathTxActiveId,
  wdRuleIds,
  wdCategory1,
  wdPayload,
  wdData,
  wdMessage,
  wdError
} from 'appWords'
import { setStateValue } from 'features/helpers'
import {
  selectTxFetchStatus,
  selectCheckboxShowOmittedValue
} from 'features/selectors'

/* eslint-disable */
import { blue, yellow, red, purple } from 'logger'
import { logFetchResults } from 'lib/logFetchResults'
/* eslint-enable */

const initialState = {
  activeId: '',
  items: [],
  fetch: {
    status: wdRequestStatusFetch,
    error: null
  }
}

const _viewName = 'all-data-by-description'

const _addFields = (data) => {
  return R.map((t) => {
    return R.mergeRight(t, {
      hasRule: !isNilOrEmpty(R.prop(wdRuleIds)(t)),
      hasCategory: !isNilOrEmpty(R.prop(wdCategory1)(t)),
      isExpense: R.prop('amount')(t) < 0,
      isIncome: R.prop('amount')(t) > 0
    })
  }, data)
}

export const txFetch = createAsyncThunk(
  'transactions/get',
  async (noValuePassed, thunkApi) => {
    const { getState } = thunkApi
    const state = getState()
    const showOmitted = selectCheckboxShowOmittedValue(state)
    const r = await api.views.read(_viewName, showOmitted)
    const { data } = r
    return R.mergeRight(r, { data: _addFields(data) })
  }
)

const _itemsSet = R.curry((items, state) => {
  return setStateValue(wdTx, pathTxItems, items, state)
})

const _txFetchStatusSet = R.curry((status, state) => {
  return setStateValue(wdTx, pathTxFetchStatus, status, state)
})

const _txFetchErrorSet = R.curry((errorMessage, state) => {
  return setStateValue(wdTx, pathTxFetchError, errorMessage, state)
})

const _activeIdSet = R.curry((id, state) => {
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
      return _activeIdSet(id, currState) // (currState)
    },
    txActiveIdClear(state) {
      const currState = current(state)
      return _activeIdSet(null, currState)
    },
    txFetchStatusSetRefresh(state) {
      const currState = current(state)
      return _txFetchStatusSet(wdRequestStatusFetch, currState)
    }
  },
  extraReducers: {
    [txFetch.pending]: (state) => {
      return R.pipe(
        _txFetchStatusSet(wdRequestStatusPending),
        _itemsSet([])
      )(current(state))
    },
    [txFetch.fulfilled]: (state, action) => {
      const items = R.path([wdPayload, wdData], action)
      return R.pipe(
        _txFetchStatusSet(wdRequestStatusFulfilled),
        _itemsSet(items)
      )(current(state))
    },
    [txFetch.rejected]: (state, action) => {
      const error = R.path([wdError, wdMessage], action)
      return R.pipe(
        selectTxFetchStatus(wdRequestStatusError),
        _itemsSet([]),
        _txFetchErrorSet(error)
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
