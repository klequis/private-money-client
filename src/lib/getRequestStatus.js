import * as R from 'ramda'
import { requestStatus } from 'globalConstants'

/**
 * 
 * @param {string} status a member of requestStatus
 * @param {array} state one or more slices as Object from redux state
 * @returns {boolean}
 */
const statusAll = (status, state) => {
  return R.pipe(
    R.values,
    R.all(R.equals(R.__, status))
  )(R.map(x => R.prop('status')(x), state))
}

/**
 * 
 * @param {string} status a member of requestStatus
 * @param {array} state one or more slices as Object from redux state
 * @returns {boolean}
 */
const statusAny = (status, slices) => {
  return R.pipe(
    R.values,
    R.filter(x => x !== undefined),
    R.any(R.equals(R.__, status))
  )(R.map(x => R.prop('status')(x), slices))
}

/**
 * 
 * @param {object} slices An array of strings which are Redux slice names
 * @returns {string}
 * if >=1 = error -> error
 * if 'all' = idle -> idle
 * if >=1 = pending -> pending
 * if 'all' = fulfilled -> fulfilled
 */
export const getRequestStatus = (slices) => {
  if (statusAny(requestStatus.error, slices)) {
    return requestStatus.error
  } else if (statusAll(requestStatus.idle, slices)) {
    return requestStatus.idle
  } else if (statusAny(requestStatus.pending, slices)) {
    return requestStatus.pending
  } else if (statusAll(requestStatus.fulfilled, slices)) {
    return requestStatus.fulfilled
  }
  return requestStatus.error
}
