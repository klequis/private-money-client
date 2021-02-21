import * as R from 'ramda'
import { criteriaFields } from './criteriaFields'
import { operatorFields } from './operatorFields'
import { isString } from 'lib/dataTypes'
import { wdField, wdOperator, wdValue } from 'appWords'

const hasField = R.has(wdField)
const hasOperator = R.has(wdOperator)
const hasValue = R.has(wdValue)

export const validateCriterion = (criterion) => {
  const newCriterion = R.pick(wdField, wdOperator, wdValue)
  if (!R.allPass([hasField, hasOperator, hasValue])(newCriterion)) {
    throw new Error(
      'Criterion is missing a field. Each criterion must have the fields "field", "operator" and "value"'
    )
  }
  if (!R.includes(R.prop(wdField)(newCriterion), criteriaFields)) {
    return false
  }
  if (!R.includes(R.prop(wdOperator)(newCriterion), operatorFields)) {
    return false
  }
  const value = R.prop(wdValue)
  if (!isString(value)) {
    return false
  }

  if (!(value.length > 3)) {
    return false
  }
}

// const validate = (criteria) => {
//   const all = R.map(validateCriterion, criteria)
//   return R.all(all)
// }

// const isValidCriteriaField = (fieldName) =>
//   R.includes(fieldName, criteriaFields)

// const isValidCriteriaFieldValue = (fieldName, value) =>
//   tFields[fieldName].validate(value)
