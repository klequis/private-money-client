import * as R from 'ramda'
import tFields from './transactionFields'
import { isString } from 'dataTypes'

// eslint-disable-next-line
import { green, redf, yellow, blue, purple } from 'logger'

/*
    criteriaFields: the are derived
*/

// .fields { }
// .fieldNames []
// .operators { }
// .operatorNames []
// .validate

/**
 * @returns {array} a list of transactionFields that can be used in criteria fields
 * @description Derived from transactionFields where isCriteraField === true
 */
export const fieldList = R.values(
  R.filter((x) => x.isCriteriaField === true, tFields)
)
blue('fieldList', fieldList)

export const fields = R.mergeAll(fieldList)
blue('fields', fields)


export const fieldNames = R.map(
  (f) => f.name,
  fields
)


const operators = {
  beginsWith: {
    name: 'beginsWith',
    description: 'Begins with'
  },
  contains: {
    name: 'contains',
    description: 'Contains'
  },
  doesNotContain: {
    name: 'doesNotContain',
    description: 'Does not contain'
  },
  equals: {
    name: 'equals',
    description: 'Equals'
  }
}

export const operatorList = R.values(operators)

export const operatorNames = R.map(
  (f) => f.name,
  fields
)


const hasField = R.has('field')
const hasOperator = R.has('operator')
const hasValue = R.has('value')

const validateCriterion = (criterion) => {
  const newCriterion = R.pick('field', 'operator', 'value')
  if (!R.allPass([hasField, hasOperator, hasValue])(newCriterion)) {
    throw new Error(`Criterion is missing a field. Each criterion must have the fields 'field', 'operator' and 'value'`)
  }
  if (!R.includes(R.prop('field')(newCriterion), fields)) {
    return false
  }
  if (!R.includes(R.prop('operator')(newCriterion), operators)) {
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
  R.includes(fieldName, fieldNames)

const isValidCriteriaFieldValue = (fieldName, value) => 
  tFields[fieldName].validate(value)

const criteria = {
  operators,
  operatorNames,
  validate
}

export default criteria