/**
 * @module requestSelectors.js
 */

import * as R from 'ramda'
import {
  wdTxFetchStatus,
  wdRulesCreateStatus,
  wdRulesUpdateStatus,
  wdRulesFetchStatus,
  wdRequestStatusError,
  wdRequestStatusPending,
  wdRequestStatusFetch,
  wdRequestStatusFulfilled,
  wdCriteriaResultsFetchStatus
} from 'appWords'
import {
  selectTxFetchStatus,
  selectCriteriaResultsFetchStatus,
  selectRulesFetchStatus,
  selectRuleCreateStatus,
  selectRuleUpdateStatus
} from 'features/selectors'

// eslint-disable-next-line
import { grpStart, grpEnd, blue, yellow, red } from 'logger'
import { green } from 'logger'

/**
 *
 * @param {Array} statusNames one of wdCriteriaResultsFetchStatus | wdTxFetchStatus | wdRulesFetchStatus | wdRulesCreateStatus | wdRulesUpdateStatus
 * @param {*} state state
 * @returns {Array} of status state values
 */
// 1. iterate slices
// 2. check if it has 'fetch' prop
// or
// 2. get slice name && -> fetch path from it?
const _statusStateValuesOld = (statusNames, state) => {
  const values = {
    [wdCriteriaResultsFetchStatus]: selectCriteriaResultsFetchStatus(state),
    [wdTxFetchStatus]: selectTxFetchStatus(state),
    [wdRulesFetchStatus]: selectRulesFetchStatus(state),
    [wdRulesCreateStatus]: selectRuleCreateStatus(state),
    [wdRulesUpdateStatus]: selectRuleUpdateStatus(state)
  }
  return R.map((name) => values[name], statusNames)
}

const _statusStateValues = (state) => {
  return (objs) => {
    return objs.reduce((accum, curVal) => {
      if (R.has('fetch')(curVal)) {
        accum.push(curVal)
      }
      return accum
    }, [])
  }
}

const _all = (statusNames, matchStatusState, state) => {
  const values = _statusStateValues(statusNames, state)
  return R.all(R.equals(R.__, matchStatusState))(values)
}

const _any = (statusNames, matchStatusState, state) => {
  const values = _statusStateValues(statusNames, state)
  // yellow('_any: values', values)
  return R.any(R.equals(R.__, matchStatusState))(values)
}

/**
 *
 * @param {Array} statusNames a status name
 * @param {object} state state
 * @returns {string} wdRequestStatusError | wdRequestStatusPending | wdRequestStatusFetch | wdRequestStatusFulfilled
 *
 * statusNames are: wdRulesFetchStatus ('rulesFetchStatus'), wdTxFetchStatus ('txFetchStatus)
 */
// export const selectRequestStatusOld = (statusNames, state) => {
//   if (_any(statusNames, wdRequestStatusError, state)) {
//     return wdRequestStatusError
//   }
//   if (_any(statusNames, wdRequestStatusPending, state)) {
//     return wdRequestStatusPending
//   }
//   if (_any(statusNames, wdRequestStatusFetch, state)) {
//     return wdRequestStatusFetch
//   }
//   if (_all(statusNames, wdRequestStatusFulfilled, state)) {
//     return wdRequestStatusFulfilled
//   }
//   grpStart('selectRequestStatus')
//   yellow('statusNames', statusNames)
//   yellow('state', state)
//   grpEnd()
//   return wdRequestStatusError
// }

const allEqual = (testValue, matchArray) =>
  R.all(R.equals(R.__, testValue), matchArray)

const anyEqual = (testValue, matchArray) =>
  R.any(R.equals(R.__, testValue), matchArray)

/**
 *
 * @param {Array} sliceNames one or more slice names
 * @param {*} state Redux state
 * @returns {string} wdRequestStatusError | wdRequestStatusPending | wdRequestStatusFulfilled
 */
export const selectRequestStatus = (sliceNames = null, state) => {
  // get current fetch status for each slice in sliceNames
  const fetchStatuses = R.map(
    (sliceName) => state[sliceName]['fetch']['status'],
    sliceNames
  )

  if (anyEqual(wdRequestStatusError, fetchStatuses))
    return wdRequestStatusPending
  if (anyEqual(wdRequestStatusPending, fetchStatuses))
    return wdRequestStatusPending
  if (anyEqual(wdRequestStatusFetch, fetchStatuses)) return wdRequestStatusFetch
  if (allEqual(wdRequestStatusFulfilled, fetchStatuses))
    return wdRequestStatusFulfilled
  return 'unknown'
}
