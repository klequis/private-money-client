import * as R from 'ramda'
import {
  // transactionFields as tFields,
  operatorSelectFieldNames,
  criteriaSelectFieldNames
} from 'globalConstants'
import isNilOrEmpty from 'lib/isNilOrEmpty'

import { ICriterion } from 'interfaces'

// @ts-ignore
// eslint-disable-next-line
import { blue, yellow, redf, green } from 'logger'

/**
 *
 * @param {object} criterion
 * @description Checks if the criterion's field prop is on of criteriaSelectFieldNames
 */
const isValidFieldPropValue = (criterion: ICriterion) => {
  const { field } = criterion
  if (isNilOrEmpty(field)) {
    return 'null is not a valid value for criteria.field'
  } else {
    return R.includes(field, criteriaSelectFieldNames)
      ? ''
      : `${field} is not a valid property for criteria.field`
  }
}

/**
 *
 * @param {object} criterion
 */
const isValidValuePropValue = (criterion: ICriterion) => {
  if (!R.has('value')(criterion)) {
    // eslint-disable-next-line
    return "Criterion is missing required property 'value'"
  }
  const { value } = criterion
  // blue('value', typeof value)
  if (isNilOrEmpty(value)) {
    return 'null is not a valid '   
  }
  return value.length > 2
    ? ''
    : `criterion: value prop must be 3 or more characters, received ${value} with length ${value.length}`
}

const isValidOperationPropValue = (criterion: ICriterion) => {
  const { operation } = criterion
  return R.includes(operation, operatorSelectFieldNames)
    ? ''
    : `${operation} is not a valid value for criterion.value`
}

const isActive = (criterion: ICriterion) => {
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

// @ts-ignore
// const log = (message) => (value) => console.log(message, value)

const check = R.pipe(
  (x: ICriterion) => ({
    _id: x._id,
    errors: predicates.map((p) => p(x))
  }),
  (x) => ({ _id: x._id, errors: R.filter((e) => e !== '', x.errors) })
)

// What fields are required?

// Are there any extra fields present

// const newWay = (criteria) => {
//   const pairs = R.toPairs(criteria)
//   yellow('pairs', pairs)
// }

const criteriaValidation = (criteria: ICriterion): string[] => {
  // yellow('criteriaTest.validation: criteria', criteria)
  
  // const newRet = newWay(criteria)

  // @ts-ignore
  const _is = R.filter((e) => e.errors.length > 0)(R.map(check, criteria))
  // @ts-ignore
  return _is
}

export default criteriaValidation
