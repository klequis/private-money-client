import * as R from 'ramda'
import {
  transactionFields as tFields,
  operatorSelectFieldNames,
  criteriaSelectFieldNames
} from 'globalConstants'

// @ts-ignore
// eslint-disable-next-line
import { blue, yellow, redf } from 'logger'

interface ICriterion {
  _id: String,
  field: String,
  operation: String,
  value: String,
  active: Boolean
}

/**
 * 
 * @param {object} criterion 
 * @description Checks if the criterion's field prop is on of criteriaSelectFieldNames
 */
const isValidFieldPropValue = (criterion: ICriterion) => {
  const { field } = criterion
  return R.includes(field, criteriaSelectFieldNames)
    ? ''
    : `${field} is not a valid property for criteria.field`
}

/**
 * 
 * @param {object} criterion 
 */
const isValidValuePropValue = (criterion) => {
  if (!R.has('value')(criterion)) {
    return "Criterion is missing required property 'value'"
  }
  const { value } = criterion
  
  return value.length > 2
    ? ''
    : `criterion: value prop must be 3 or more characters, received ${value} with length ${value.length}`
}

const isValidOperationPropValue = (criterion) => {
  const { operation } = criterion
  return R.includes(operation, operatorSelectFieldNames)
    ? ''
    : `${operation} is not a valid value for criterion.value`
}

const isActive = (criterion) => {
  const { active } = criterion
  return active
    ? ''
    : 'Received criterion where criterion.active=false. Cannot process inactive criterion.'
}

const predicates = [
  isActive,
  isValidFieldPropValue,
  isValidValuePropValue,
  isValidOperationPropValue
]

const check = R.pipe(
  (x) => ({
    _id: x._id,
    errors: predicates.map((p) => p(x))
  }),
  (x) => ({ _id: x._id, errors: R.filter((e) => e !== '', x.errors) })
)

const criteriaValidation = (criteria) => {
  // yellow('criteriaTest.validation: criteria', criteria)
  const _is = R.filter((e) => e.errors.length > 0)(R.map(check, criteria))
  return _is
}

export default criteriaValidation
