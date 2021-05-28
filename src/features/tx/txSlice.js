import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { api } from 'api'
import * as R from 'ramda'
import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { getMonthIndex } from 'lib/getMonthIndex'
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
import { createNewState } from 'features/helpers'
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

    // start timer
    const s2 = new Date().getTime()
    //////////////

    const y = data.filter((t) => {
      const d = new Date(t.date)
      const y = d.getFullYear()
      const m = d.getMonth()
      return y === 2020 && m === getMonthIndex('apr')
    })

    // end timer
    const e2 = new Date().getTime()
    const t2 = e2 - s2
    red('t2', t2)
    //////////////

    return R.mergeRight(r, { data: _addFields(y) })
  }
)

const _itemsSet = R.curry((items, state) => {
  return createNewState(pathTxItems, items, state)
})

const _txFetchStatusSet = R.curry((status, state) => {
  return createNewState(pathTxFetchStatus, status, state)
})

const _txFetchErrorSet = R.curry((errorMessage, state) => {
  return createNewState(pathTxFetchError, errorMessage, state)
})

const _activeIdSet = R.curry((id, state) => {
  return createNewState(pathTxActiveId, id, state)
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
