import * as R from 'ramda'
import { selectorPaths } from './selectorPaths.'
import { requestStatusNames, requestStatusStates } from 'globalConstants'
// eslint-disable-next-line
import { grpStart, grpEnd, blue, yellow, red } from 'logger'

const statusValues = (statusName, state) => {
  const {
    criteriaResultsFetchStatus: criteriaResultsFetchStatus,
    transactionsFetchStatus,
    rulesFetchStatus,
    ruleCreateStatus,
    ruleUpdateStatus
  } = requestStatusNames
  const values = {
    [criteriaResultsFetchStatus]: R.path(
      ['criteriaResults', requestStatusNames.criteriaResultsFetchStatus],
      state
    ),
    [transactionsFetchStatus]: R.path(
      selectorPaths.transactionsFetchStatus,
      state
    ),
    [rulesFetchStatus]: R.path(selectorPaths.rulesFetchStatus, state),
    [ruleCreateStatus]: R.path(selectorPaths.ruleCreateStatus, state),
    [ruleUpdateStatus]: R.path(selectorPaths.ruleUpdateStatus, state)
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
 
  const { error, fulfilled, pending, refresh } = requestStatusStates

  // blue('statusNames', statusNames)  
  // blue('state', state)

  if (any(statusNames, error, state)) {
    // yellow('1: any', 'error')
    return requestStatusStates.error
  }
  if (any(statusNames, pending, state)) {
    // yellow('3: any', pending)
    return requestStatusStates.pending
  }
  if (any(statusNames, refresh, state)) {
    // yellow('4: any', refresh)
    return requestStatusStates.refresh
  }
  if (all(statusNames, fulfilled, state)) {
    // yellow('5: all', 'fulfilled')
    return requestStatusStates.fulfilled
  }
  // yellow('6: error', error)
  return requestStatusStates.error
}

/**
 *
 * @param {object} state
 * @return {string} one of requestStatusStates
 */
export const selectTransactionsFetchStatus = (state) => {
  return R.path(selectorPaths.transactionsFetchStatus, state)
}

/**
 * 
 * @param {state} state 
 * @return {string} one of requestStatusStates
 */
export const selectRulesFetchStatus = (state) => R.path(selectorPaths.rulesFetchStatus, state)

/**
 * 
 * @param {state} state 
 * @return {string} one of requestStatusStates
 */
export const selectCriteriaResultsFetchStatus = (state) => R.path(selectorPaths.criteriaResultsFetchStatus, state)
