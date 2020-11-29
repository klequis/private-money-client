import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import {
  wdActiveTransactionId,
  wdError,
  wdItems,
  wdTransactions,
  wdTransactionsFetchStatus,
  wdTransactionsItems
} from 'appWords'
import * as R from 'ramda'

const paths = {
  [wdActiveTransactionId]: [wdTransactions, wdActiveTransactionId],
  [wdError]: [wdTransactions, wdError],
  [wdTransactionsItems]: [wdTransactions, wdItems],
  [wdTransactionsFetchStatus]: [wdTransactions, wdTransactionsFetchStatus]
}

/**
 * 
 * @param {state} state 
 * @returns {boolean}
 */
const hasTransactions = (state) => R.has(wdTransactions)(state)
/**
 *
 * @param {object} state
 * @param {array} fullPath
 */
const getPath = (state, fullPath) =>
  hasTransactions(state) ? fullPath : R.tail(fullPath)

/**
 *
 * @param {object} state
 * @returns {array} of transactions objects
 */
export const selectAllTransactions = (state) => {
  return R.path(getPath(state, paths.transactionsItems))
}

/**
 *
 * @param {string} transactionId
 * @param {object} state
 * @returns {object} one transaction
 */
export const selectOneTransaction = (transactionId, state) => {
  const path = getPath(state, paths.transactionsItems)
  const tItems = R.path(path, state)
  if (isNilOrEmpty(tItems)) {
    return tItems
  }
  const ret = R.find(R.propEq('_id', transactionId))(tItems)
  return R.equals(R.type(ret), 'Undefined') ? null : ret
}

// export const selectTransactionRuleIds = (transactionId, state) => {
//   const transaction = selectOneTransaction(transactionId, state)
//   return R.path(['ruleIds'], transaction)
// }

// export const selectTransactionsError = (state) =>
//   R.path(selectorPaths..transactionsError, state)

/**
 * 
 * @param {object} state 
 */
export const selectActiveTransactionId = (state) => {
  // return R.path(selectorPaths.activeTransactionId, state) || null
  return R.path(getPath(state, paths.activeTransactionId), state)
}

// export const selectActiveTransaction = (state) => {
//   const tId = selectActiveTransactionId(state)
//   // blue('selectActiveTransaction: tId', tId)
//   return R.type(tId) === 'Null' ? null : selectOneTransaction(tId, state)
// }

// export const selectTransactionFieldValue = (
//   fieldName,
//   transactionId,
//   state
// ) => {
//   const t = selectOneTransaction(transactionId, state)
//   return t[fieldName]
// }

/**
 * 
 * @param {object} state 
 * @returns {string} a request status word from appWords.js
 */
// export const selectTransactionsFetchStatus = (state) => 
//   R.path(getPath(state, wdTransactionsFetchStatus).transactionsFetchStatus, state)

/**
 * 
 * @param {object} state 
 * @returns a request status word from appWords.js
 */
export const selectTransactionsFetchStatus = (state) => 
  R.path(getPath(state, paths.transactionsFetchStatus), state)
  // R.path(selectorPaths.transactionsFetchStatus, state)


