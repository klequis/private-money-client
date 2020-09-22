import * as R from 'ramda'
import {
  operatorSelectFieldNames,
  criteriaSelectFieldNames
} from 'globalConstants'
import isNilOrEmpty from 'lib/isNilOrEmpty'

// eslint-disable-next-line
import { blue, yellow, redf } from 'logger'

const isCriterionFieldPropValueValid = (criterion) => {
  // log('       isCriterionFieldPropValueValid', 1)
  const { field } = criterion
  blue('_isCriterionFieldPropValueValid: field', field)
  const r = R.includes(field, criteriaSelectFieldNames)
  return r ? '' : `${field} is not a valid property for criteria.field`
}
const isCriterionValuePropValueLongEnough = (criterion) => {
  // log('       isCriterionValuePropValueLongEnough', 2)
  if (!R.has('value')(criterion)) {
    return "Criterion is missing required property 'value'"
  }
  const { value } = criterion
  
  console.group("_isCriterionValuePropValueLongEnough")
    yellow('value', value)
    yellow('isNilOrEmpty(value)', isNilOrEmpty(value))
    yellow('typeof value', typeof value)
  console.groupEnd()
  
  let msg = ''

  if (isNilOrEmpty(value)) {
    msg = `criterion: value prop must be 3 or more characters, received ${value} with length 0`
  } else if (!value.length > 2) {
    msg = `criterion: value prop must be 3 or more characters, received ${value} with length ${value.length}`
  }
  return msg === '' ? '' : msg
}

const isCriterionOperationPropValueValid = (criterion) => {
  // log('       isCriterionOperationPropValueValid', 3)
  const { operation } = criterion
  blue('_isCriterionOperationPropValueValid: operation', operation)
  const r = R.includes(operation, operatorSelectFieldNames)
  return r ? '' : `${operation} is not a valid value for criterion.value`
}

const isCriterionActive = (criterion) => {
  // log('       isCriterionActive', 4)
  const { active } = criterion
  blue('_isCriterionActive: active', active)
  const r = active
  return r ? '' : 'Received criterion where criterion.active=false. Cannot process inactive criterion.'
}

const predicates = [
  isCriterionActive,
  isCriterionFieldPropValueValid,
  isCriterionValuePropValueLongEnough,
  isCriterionOperationPropValueValid
]


const check = R.pipe(
  x => ({
    _id: x._id,
    errors: predicates.map(p => p(x))
  }),
  x  => ({ _id: x._id, errors: R.filter(e => e !== '', x.errors) }),
)

const criteriaValidation = criteria => {
  
  const _is = R.filter(e => e.errors.length > 0)(R.map(check, criteria))
  blue('criteriaValidation: _is', _is)
  return _is
}

export default criteriaValidation

