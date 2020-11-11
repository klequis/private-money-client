import * as R from 'ramda'
import { criteriaFields } from './criteriaFields'
import { operatorFields } from './operatorFields'
import { transactionFields as tFields } from 'features/transactions'
import { isString } from 'lib/dataTypes'

const hasField = R.has('field')
const hasOperator = R.has('operator')
const hasValue = R.has('value')

export const validateCriterion = (criterion) => {
  const newCriterion = R.pick('field', 'operator', 'value')
  if (!R.allPass([hasField, hasOperator, hasValue])(newCriterion)) {
    throw new Error(`Criterion is missing a field. Each criterion must have the fields 'field', 'operator' and 'value'`)
  }
  if (!R.includes(R.prop('field')(newCriterion), criteriaFields)) {
    return false
  }
  if (!R.includes(R.prop('operator')(newCriterion), operatorFields)) {
    return false
  }
  const value = R.prop('value')
  if (!isString(value)) {
    return false
  }

  if (!(value.length > 3)) {
    return false
  }
}

const validate = (criteria) => {
  const all = R.map(validateCriterion, criteria)
  return R.all(all)
}



const isValidCriteriaField = (fieldName) =>
  R.includes(fieldName, criteriaFields)

const isValidCriteriaFieldValue = (fieldName, value) =>
  tFields[fieldName].validate(value)