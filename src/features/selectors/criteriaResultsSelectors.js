import { slicePaths } from './slicePaths'
import * as R from 'ramda'

export const selectCriteriaResults = (state) =>
  R.path(slicePaths.criteriaResults, state)
