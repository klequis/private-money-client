import { selectorPaths } from './selectorPaths.'
import * as R from 'ramda'
import { valueOrEmptyArray } from './helpers'

const hasCriteriaResults = (state) => R.has('criteriaResults')(state)
const getPath = (state, fullPath) => 
  hasCriteriaResults(state) ? fullPath : R.tail(fullPath)

export const selectCriteriaResults = (state) => {
  const path = getPath(state, selectorPaths.criteriaResults)
  const criteriaResults = R.path(path, state)
  valueOrEmptyArray(criteriaResults)
}
  
