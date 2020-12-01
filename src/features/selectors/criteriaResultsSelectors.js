import { valueOrEmptyArray } from 'features/helpers'
import { 
  pathCriteriaResultsFetchStatus,
  pathCriteriaResults,
  wdCriteriaResults
} from 'appWords'
import { getStateValue } from 'features/helpers'

// eslint-disable-next-line
import { blue } from 'logger'


// const hasCriteriaResults = (state) => R.has(wdCriteriaResults)(state)
// const getPath = (state, fullPath) => 
//   hasCriteriaResults(state) ? fullPath : R.tail(fullPath)


/**
 * 
 * @param {state} state state
 * @returns {object|Array} of transactions objects
 */
export const selectCriteriaResults = (state) => {
  const criteriaResults = getStateValue(wdCriteriaResults, pathCriteriaResults, state)
  return valueOrEmptyArray(criteriaResults)
}

// /**
//  *
//  * @param {object} state
//  * @returns {array} of transaction objects
//  */

 // TODO: which is currect selectCriteriaResults - above or below ?
/*
export const selectCriteriaResults = (state) => {
  // const ids = R.path(selectorPaths.criteriaResultsItems, state)
  const ids = R.path(getPath(state, paths.criteriaResultsItems), state)

  // return R.path(selectorPaths.transactionsItems, state).filter((t) =>
  //   ids.includes(t._id)
  // )
  return R.path(getPath(state, paths.transactions), state).filter((t) =>
    ids.includes(t._id)
  )
}
*/

/**
 *
 * @param {state} state state
 * @returns {string} a request status word from appWords.js
 */
export const selectCriteriaResultsFetchStatus = (state) => {
  // blue('path', pathCriteriaResultsFetchStatus)
  return getStateValue(wdCriteriaResults, pathCriteriaResultsFetchStatus, state)
}
  