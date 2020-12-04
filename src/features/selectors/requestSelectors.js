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

/**
 *
 * @param {Array} statusNames one of wdCriteriaResultsFetchStatus | wdTxFetchStatus | wdRulesFetchStatus | wdRulesCreateStatus | wdRulesUpdateStatus
 * @param {*} state state
 * @returns {Array} of status state values
 */
const statusStateValues = (statusNames, state) => {
  const values = {
    [wdCriteriaResultsFetchStatus]: selectCriteriaResultsFetchStatus(state),
    [wdTxFetchStatus]: selectTxFetchStatus(state),
    [wdRulesFetchStatus]: selectRulesFetchStatus(state),
    [wdRulesCreateStatus]: selectRuleCreateStatus(state),
    [wdRulesUpdateStatus]: selectRuleUpdateStatus(state)
  }
  return R.map((name) => values[name], statusNames)
}

const all = (statusNames, matchStatusState, state) => {
  const values = statusStateValues(statusNames, state)
  return R.all(R.equals(R.__, matchStatusState))(values)
}

const any = (statusNames, matchStatusState, state) => {
  const values = statusStateValues(statusNames, state)
  return R.any(R.equals(R.__, matchStatusState))(values)
}

/**
 *
 * @param {Array} statusNames a status name
 * @param {object} state state
 * @returns {string} wdRequestStatusError | wdRequestStatusPending | wdRequestStatusFetch | wdRequestStatusFulfilled
 */
export const selectRequestStatus = (statusNames, state) => {
  if (any(statusNames, wdRequestStatusError, state)) {
    return wdRequestStatusError
  }
  if (any(statusNames, wdRequestStatusPending, state)) {
    return wdRequestStatusPending
  }
  if (any(statusNames, wdRequestStatusFetch, state)) {
    return wdRequestStatusFetch
  }
  if (all(statusNames, wdRequestStatusFulfilled, state)) {
    return wdRequestStatusFulfilled
  }
  return wdRequestStatusError
}
