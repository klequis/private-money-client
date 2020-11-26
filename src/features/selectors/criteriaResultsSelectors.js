import { selectorPaths } from './slicePaths'
import * as R from 'ramda'

export const selectCriteriaResults = (state) =>
  R.path(selectorPaths.criteriaResults, state)
