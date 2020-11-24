// import * as R from 'ramda'
// import { slicePaths } from 'slicePaths'

// // eslint-disable-next-line
// import { grpStart, grpEnd, blue, yellow, red } from 'logger'

// red('requestStatus', 'hi')
// red('slicePaths', slicePaths)

// export const requestStatusNames = {
//   criteriaResultsFetchStatus: 'criteriaResultsFetchStatus',
//   transactionsFetchStatus: 'transactionsFetchStatus',
//   rulesFetchStatus: 'rulesFetchStatus',
//   ruleCreateStatus: 'ruleCreateStatus',
//   ruleUpdateStatus: 'ruleUpdateStatus'
// }

// export const requestStatusStates = {
//   error: 'request-error',
//   fulfilled: 'request-fulfilled',
//   idle: 'idle',
//   pending: 'request-pending',
//   refresh: 'refresh'
// }

// const getStateValues = (statusNames, state) => {
//   grpStart('getStateValues')
//   blue('statusNames', statusNames)
//   blue('state', state)
  
//   const statusValues = {
//     criteriaResultsStatus: R.path(
//       ['criteriaResults', requestStatusNames.criteriaResultsFetchStatus],
//       state
//     ),
//     transactionsStatus: R.path(['transactions', requestStatusNames.transactionsFetchStatus], state),
//     rulesFetchStatus: R.path(['rules', requestStatusNames.rulesFetchStatus], state),
//     ruleCreateStatus: R.path(['rules', requestStatusNames.ruleCreateStatus], state),
//     ruleUpdateStatus: R.path(['rules', requestStatusNames.ruleUpdateStatus], state)
//   }
//   blue('statusValues', statusValues)
//   const ret = R.map((x) => statusValues[x], statusNames)
//   blue('ret', ret)
//   grpEnd()
//   return ret
// }

// const all = (statusNames, matchStatusState, state) => {
//   const values = getStateValues(statusNames, state)
//   return R.all(R.equals(R.__, matchStatusState))(values)
// }

// const any = (statusNames, matchStatusState, state) => {
//   const values = getStateValues(statusNames, state)
//   return R.any(R.equals(R.__, matchStatusState))(values)
// }

// /**
//  *
//  * @param {array} statusNames
//  * @param {object} state
//  */
// export const selectRequestStatus = (statusNames, state) => {
//   grpStart('selectRequestStatus')
//   blue('statusNames', statusNames)
//   blue('state', state)
//   grpEnd()
//   const { error, fulfilled, idle, pending, refresh } = requestStatusStates

//   if (any(statusNames, error, state)) {
//     yellow('1: any', 'error')
//     return requestStatusStates.error
//   }
//   if (all(statusNames, idle, state)) {
//     yellow('2: all', 'idle')
//     return requestStatusStates.idle
//   }
//   if (any(statusNames, pending, state)) {
//     yellow('3: any', pending)
//     return requestStatusStates.pending
//   }
//   if (any(statusNames, refresh, state)) {
//     yellow('4: any', refresh)
//     return requestStatusStates.refresh
//   }
//   if (all(statusNames, fulfilled, state)) {
//     yellow('5: all', 'fulfilled')
//     return requestStatusStates.fulfilled
//   }
//   yellow('6: error', error)
//   return requestStatusStates.error
// }

// const selectTransactionsFetchStatus = (state) => {
//   return R.path(slicePaths.transactionsFetchStatus, state)
// }


