import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { pathTxActiveId, wdTx, pathTxItems, pathTxFetchStatus } from 'appWords'
import * as R from 'ramda'
import { getStateValue } from 'features/helpers'

/**
 *
 * @param {object} state
 * @returns {array} of transactions objects
 */
export const selectAllTransactions = (state) => {
  // return R.path(pathTxItems, state)
  return getStateValue(wdTx, pathTxItems, state)
}

/**
 *
 * @param {string} transactionId
 * @param {object} state
 * @returns {object} one transaction
 */
export const selectOneTransaction = (transactionId, state) => {
  // const tItems = R.path(pathTxItems, state)
  const tItems = getStateValue(wdTx, pathTxItems, state)
  if (isNilOrEmpty(tItems)) {
    return tItems
  }
  const ret = R.find(R.propEq('_id', transactionId))(tItems)
  return R.equals(R.type(ret), 'Undefined') ? null : ret
}

/**
 *
 * @param {object} state
 * @returns {string}
 */
export const selectActiveTransactionId = (state) => {
  return getStateValue(wdTx, pathTxActiveId, state)
}

/**
 *
 * @param {object} state
 * @returns {string} a request status word from appWords.js
 */
export const selectTransactionsFetchStatus = (state) =>
  getStateValue(wdTx, pathTxFetchStatus, state)
