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
  // grpStart('statusValues')
  // const {
  //   criteriaResultsFetchStatus: criteriaResultsFetchStatus,
  //   transactionsFetchStatus,
  //   rulesFetchStatus,
  //   ruleCreateStatus,
  //   ruleUpdateStatus
  // } = requestStatusNames
  const values = {
    [wdCriteriaResultsFetchStatus]: selectCriteriaResultsFetchStatus(state),
    [wdTxFetchStatus]: selectTxFetchStatus(state),
    [wdRulesFetchStatus]: selectRulesFetchStatus(state),
    [wdRulesCreateStatus]: selectRuleCreateStatus(state),
    [wdRulesUpdateStatus]: selectRuleUpdateStatus(state)
  }
  // blue('statusNames', statusNames)
  // blue('values', values)

  // const x = R.map(name => values[name], statusNames)
  // blue('x', x)

  const ret = R.map(name => values[name], statusNames)
  // blue('ret', ret)
  // grpEnd()
  return ret
}

const all = (statusNames, matchStatusState, state) => {
  const values = statusStateValues(statusNames, state)
  return R.all(R.equals(R.__, matchStatusState))(values)
}

const any = (statusNames, matchStatusState, state) => {
  // grpStart('any')
  // blue('statusNames', statusNames)
  // blue('matchStatusState', matchStatusState)
  // blue('state', state)
  
  const values = statusStateValues(statusNames, state)
  // blue('values', values)
  const ret = R.any(R.equals(R.__, matchStatusState))(values)
  // blue('ret', ret)
  // grpEnd()
  return ret
}

/**
 *
 * @param {Array} statusNames a status name
 * @param {object} state state
 * @returns {string} wdRequestStatusError | wdRequestStatusPending | wdRequestStatusFetch | wdRequestStatusFulfilled
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
