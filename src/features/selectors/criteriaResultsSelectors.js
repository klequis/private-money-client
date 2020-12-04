import { valueOrEmptyArray } from 'features/helpers'
import {
  pathCriteriaResultsFetchStatus,
  wdCriteriaResults,
  pathCriteriaResultsItems
} from 'appWords'
import { getStateValue } from 'features/helpers'
import { selectTxItems } from 'features/selectors'

/* eslint-disable */
import { blue } from 'logger'
import { red } from 'logger'
/* eslint-enable */

/**
 *
 * @param {state} state state
 * @returns {object|Array} of transactions objects
 */
export const selectCriteriaResultsX = (state) => {
  const criteriaResults = getStateValue(
    wdCriteriaResults,
    pathCriteriaResultsItems,
    state
  )
  return valueOrEmptyArray(criteriaResults)
}

/**
 *
 * @param {object} state state
 * @returns {Array}  of transactions objects
 */
export const selectCriteriaResults = (state) => {
  const ids = getStateValue(wdCriteriaResults, pathCriteriaResultsItems, state)
  return selectTxItems(state).filter((t) => ids.includes(t._id))
}

/**
 *
 * @param {state} state state
 * @returns {string} a request status word from appWords.js
 */
export const selectCriteriaResultsFetchStatus = (state) => {
  return getStateValue(wdCriteriaResults, pathCriteriaResultsFetchStatus, state)
}
