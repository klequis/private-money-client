import { isNilOrEmpty } from 'lib/isNilOrEmpty'
import { pathTxActiveId, wdTx, pathTxItems, pathTxFetchStatus } from 'appWords'
import * as R from 'ramda'
import { getStateValue } from 'features/helpers'

/* eslint-disable */
import { blue, grpStart, grpEnd } from 'logger'
/* eslint-enable */

/**
 *
 * @param {object} state state
 * @returns {Array} of transactions objects
 */
export const selectTxItems = (state) => {
  // return R.path(pathTxItems, state)
  return getStateValue(wdTx, pathTxItems, state)
}

const getTx = (txId, state) => {
  const tItems = getStateValue(wdTx, pathTxItems, state)
  if (isNilOrEmpty(tItems)) {
    return tItems
  }
  const ret = R.find(R.propEq('_id', txId))(tItems)
  return R.equals(R.type(ret), 'Undefined') ? null : ret
}

/**
 *
 * @param {string} txId mongo ObjectId for existing tx
 * @param {object} state state
 * @returns {object} one transaction
 */
export const selectOneTx = (txId, state) => {
  return getTx(txId, state)
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

/**
 *
 * @param {object} state  state
 * @returns {null|string} null or the transaction's origDescription
 */
export const selectActiveTxOrigDescription = (state) => {
  const txId = selectActiveTxId(state)
  blue('txId', txId)
  const tx = getTx(txId, state)
  if (isNilOrEmpty(tx)) {
    return null
  } else {
    const { origDescription } = tx
    return origDescription
  }
}
