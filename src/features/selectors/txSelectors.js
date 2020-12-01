import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { pathTxActiveId, wdTx, pathTxItems, pathTxFetchStatus } from 'appWords'
import * as R from 'ramda'
import { getStateValue } from 'features/helpers'

/**
 *
 * @param {object} state state
 * @returns {Array} of transactions objects
 */
export const selectTxItems = (state) => {
  // return R.path(pathTxItems, state)
  return getStateValue(wdTx, pathTxItems, state)
}

/**
 *
 * @param {string} transactionId mongo ObjectId for existing tx
 * @param {object} state state
 * @returns {object} one transaction
 */
export const selectOneTx = (transactionId, state) => {
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
 * @param {object} state state
 * @returns {string} _id of active Tx
 */
export const selectActiveTxId = (state) => {
  return getStateValue(wdTx, pathTxActiveId, state)
}

/**
 *
 * @param {object} state state
 * @returns {string} a request status word from appWords.js
 */
export const selectTxFetchStatus = (state) =>
  getStateValue(wdTx, pathTxFetchStatus, state)
