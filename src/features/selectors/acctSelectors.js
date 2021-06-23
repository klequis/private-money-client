import { getStateValue } from 'features/helpers'
import { pathAcctItems, pathAcctFetchStatus } from 'appWords'
/**
 *
 * @param {object} state state
 * @returns {Array} of transactions objects
 */
export const selectAcctItems = (state) => {
  return getStateValue(pathAcctItems, state)
}

/**
 *
 * @param {object} state state
 * @returns {string} a request status word from appWords.js
 */
export const selectAcctFetchStatus = (state) =>
  getStateValue(pathAcctFetchStatus, state)
