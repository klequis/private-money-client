import * as R from 'ramda'

// eslint-disable-next-line
import { grpStart, grpEnd, blue, yellow } from 'logger'

export const requestStatusNames = {
  criteriaResultsStatus: 'criteriaResultsStatus',
  transactionsFetchStatus: 'transactionsStatus',
  rulesFetchStatus: 'rulesFetchStatus',
  ruleCreateStatus: 'ruleCreateStatus',
  ruleUpdateStatus: 'ruleUpdateStatus'
}

export const requestStatusStates = {
  error: 'request-error',
  fulfilled: 'request-fulfilled',
  idle: 'idle',
  pending: 'request-pending',
  refresh: 'refresh'
}

const getStateValues = (statusNames, state) => {
  const statusValues = {
    criteriaResultsStatus: R.path(
      ['criteriaResults', 'criteriaResultsStatus'],
      state
    ),
    transactionsStatus: R.path(['transactions', 'transactionsStatus'], state),
    rulesFetchStatus: R.path(['rules', 'rulesFetchStatus'], state),
    ruleCreateStatus: R.path(['rules', 'ruleCreateStatus'], state),
    ruleUpdateStatus: R.path(['rules', 'ruleUpdateStatus'], state)
  }
  return R.map((x) => statusValues[x], statusNames)
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
export const getRequestStatus = (statusNames, state) => {
  const { error, idle, pending, fulfilled } = requestStatusStates

  if (any(statusNames, error, state)) {
    // yellow('1: any', 'error')
    return requestStatusStates.error
  }
  if (all(statusNames, idle, state)) {
    // yellow('2: all', 'idle')
    return requestStatusStates.idle
  }
  if (any(statusNames, pending, state)) {
    // yellow('3: any', pending)
    return requestStatusStates.pending
  }
  if (all(statusNames, fulfilled, state)) {
    // yellow('4: all', 'fulfilled')
    return requestStatusStates.fulfilled
  }
  // yellow('5: error', error)
  return requestStatusStates.error
}
