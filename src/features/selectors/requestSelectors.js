/**
 * @module requestSelectors.js
 */

import * as R from 'ramda'
import {
  wdCriteriaResultsFetchStatus,
  wdTransactionsFetchStatus,
  wdRuleCreateStatus,
  wdRuleUpdateStatus,
  wdRulesFetchStatus,
  wdRequestStatusError,
  wdRequestStatusPending,
  wdRequestStatusRefresh,
  wdRequestStatusFulfilled
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
    [wdTransactionsFetchStatus]: selectTransactionsFetchStatus(state),
    [wdRulesFetchStatus]: selectRulesFetchStatus(state),
    [wdRuleCreateStatus]: selectRuleCreateStatus(state),
    [wdRuleUpdateStatus]: selectRuleUpdateStatus(state)
  }
  return values[statusName]
}

const getStateValues = (statusNames, state) => {
  return R.map((x) => statusValues(x, state), statusNames)
}

const all = (statusNames, matchStatusState, state) => {
  const values = getStateValues(statusNames, state)
  return R.all(R.equals(R.__, matchStatusState))(values)
}

const any = (statusNames, matchStatusState, state) => {
  const values = getStateValues(statusNames, state)
  return R.any(R.equals(R.__, matchStatusState))(values)
}

/**
 *
 * @param {array} statusNames
 * @param {object} state
 */
export const selectRequestStatus = (statusNames, state) => {

  // blue('statusNames', statusNames)
  // blue('state', state)

  if (any(statusNames, wdRequestStatusError, state)) {
    // yellow('1: any', 'error')
    return wdRequestStatusError
  }
  if (any(statusNames, wdRequestStatusPending, state)) {
    // yellow('3: any', pending)
    return wdRequestStatusPending
  }
  if (any(statusNames, wdRequestStatusRefresh, state)) {
    // yellow('4: any', refresh)
    return wdRequestStatusRefresh
  }
  if (all(statusNames, wdRequestStatusFulfilled, state)) {
    // yellow('5: all', 'fulfilled')
    return wdRequestStatusFulfilled
  }
  // yellow('6: error', error)
  return wdRequestStatusError
}






