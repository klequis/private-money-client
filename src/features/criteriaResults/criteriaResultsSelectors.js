import { selectorPaths } from './selectorPaths.'
import * as R from 'ramda'
import { valueOrEmptyArray } from './helpers'
import { wdCriteriaResults } from 'appWords'

const hasCriteriaResults = (state) => R.has('criteriaResults')(state)
const getPath = (state, fullPath) => 
  hasCriteriaResults(state) ? fullPath : R.tail(fullPath)


/**
 * 
 * @param {state} state 
 * @returns {object || []} of transactions objects
 */
export const selectCriteriaResults = (state) => {
  const path = getPath(state, wdCriteriaResults)
  const criteriaResults = R.path(path, state)
  valueOrEmptyArray(criteriaResults)
}
  
/**
 *
 * @param {state} state
 * @return {string} a request status word from appWords.js
 */
export const selectCriteriaResultsFetchStatus = (state) =>
  R.path(selectorPaths.criteriaResultsFetchStatus, state)