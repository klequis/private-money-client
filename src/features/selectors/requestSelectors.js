/**
 * @module requestSelectors.js
 */

import * as R from 'ramda'
import {
  wdRequestStatusError,
  wdRequestStatusPending,
  wdRequestStatusFetch,
  wdRequestStatusFulfilled
} from 'appWords'

// eslint-disable-next-line
import { green, grpStart, grpEnd, blue, yellow, red } from 'logger'

const allEqual = (testValue, matchArray) =>
  R.all(R.equals(R.__, testValue), matchArray)

const anyEqual = (testValue, matchArray) =>
  R.any(R.equals(R.__, testValue), matchArray)

/**
 *
 * @param {Array} sliceNames one or more slice names
 * @param {*} state Redux state
 * @returns {string} wdRequestStatusError | wdRequestStatusPending | wdRequestStatusFulfilled
 */
export const selectRequestStatus = (sliceNames = null, state) => {
  // get current fetch status for each slice in sliceNames
  const fetchStatuses = R.map(
    (sliceName) => state[sliceName]['fetch']['status'],
    sliceNames
  )
  if (anyEqual(wdRequestStatusError, fetchStatuses))
    return wdRequestStatusPending
  if (anyEqual(wdRequestStatusPending, fetchStatuses))
    return wdRequestStatusPending
  if (anyEqual(wdRequestStatusFetch, fetchStatuses)) return wdRequestStatusFetch
  if (allEqual(wdRequestStatusFulfilled, fetchStatuses))
    return wdRequestStatusFulfilled
  return 'unknown'
}
