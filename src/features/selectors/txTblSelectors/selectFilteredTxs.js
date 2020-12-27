import { sortTx } from './sortTx'
import { filterTx } from './filterTx'
/**
 *
 * @param {object} state state
 * @returns {Array} of filtered transaction objects
 */
export const selectFilteredTxs = (state, txItems) => {
  // get all items

  const filteredItems = filterTx(state, txItems)

  return filteredItems
  // return sortTx(state, filteredItems)
}
