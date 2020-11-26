import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { selectorPaths } from './slicePaths'
import * as R from 'ramda'

/**
 *
 * @param {object} state
 */
export const selectAllTransactions = (state) => state.transactions.items

/**
 *
 * @param {string} transactionId
 * @param {object} state
 */
export const selectOneTransaction = (transactionId, state) => {
  const tItems = R.path(selectorPaths.transactionsItems, state)
  if (isNilOrEmpty(tItems)) {
    return tItems
  }
  const ret = R.find(R.propEq('_id', transactionId))(tItems)
  return R.equals(R.type(ret), 'Undefined') ? null : ret
}

/**
 * 
 * @param {object} state 
 */
export const selectCriteriaResultsTransactions = (state) => {
  const ids = R.path(selectorPaths.criteriaResultsItems, state)
  return R.path(selectorPaths.transactionsItems, state).filter((t) =>
    ids.includes(t._id)
  )
}

// export const selectTransactionRuleIds = (transactionId, state) => {
//   const transaction = selectOneTransaction(transactionId, state)
//   return R.path(['ruleIds'], transaction)
// }

// export const selectTransactionsError = (state) =>
//   R.path(slicePaths.transactionsError, state)

/**
 * 
 * @param {object} state 
 */
export const selectActiveTransactionId = (state) => {
  return R.path(selectorPaths.activeTransactionId, state) || null
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

export const selectTransactionsFetchStatus = (state) => R.path(selectorPaths.transactionsFetchStatus, state)