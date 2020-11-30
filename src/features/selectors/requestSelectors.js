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
  selectTransactionsFetchStatus,
  selectCriteriaResultsFetchStatus,
  selectRulesFetchStatus,
  selectRuleCreateStatus,
  selectRuleUpdateStatus
} from 'features/selectors'

// eslint-disable-next-line
import { grpStart, grpEnd, blue, yellow, red } from 'logger'

const statusValues = (statusName, state) => {
  // const {
  //   criteriaResultsFetchStatus: criteriaResultsFetchStatus,
  //   transactionsFetchStatus,
  //   rulesFetchStatus,
  //   ruleCreateStatus,
  //   ruleUpdateStatus
  // } = requestStatusNames
  const values = {
    [wdCriteriaResultsFetchStatus]: selectCriteriaResultsFetchStatus(state),
    [wdTxFetchStatus]: selectTransactionsFetchStatus(state),
    [wdRulesFetchStatus]: selectRulesFetchStatus(state),
    [wdRulesCreateStatus]: selectRuleCreateStatus(state),
    [wdRulesUpdateStatus]: selectRuleUpdateStatus(state)
  }
  blue('values', values)
  return values[statusName]
}

const all = (statusNames, matchStatusState, state) => {
  const values = statusValues(statusNames, state)
  return R.all(R.equals(R.__, matchStatusState))(values)
}

const any = (statusNames, matchStatusState, state) => {
  const values = statusValues(statusNames, state)
  return R.any(R.equals(R.__, matchStatusState))(values)
}

/**
 *
 * @param {array} statusNames
 * @param {object} state
 */
export const selectRequestStatus = (statusNames, state) => {

  blue('statusNames', statusNames)
  blue('state', state)

  if (any(statusNames, wdRequestStatusError, state)) {
    // yellow('1: any', 'error')
    return wdRequestStatusError
  }
  if (any(statusNames, wdRequestStatusPending, state)) {
    // yellow('3: any', pending)
    return wdRequestStatusPending
  }
  if (any(statusNames, wdRequestStatusFetch, state)) {
    // yellow('4: any', refresh)
    return wdRequestStatusFetch
  }
  if (all(statusNames, wdRequestStatusFulfilled, state)) {
    // yellow('5: all', 'fulfilled')
    return wdRequestStatusFulfilled
  }
  // yellow('6: error', error)
  return wdRequestStatusError
}






