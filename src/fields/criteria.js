import * as R from 'ramda'
import tFields from './transactionFields'
import { yellow } from 'logger'
import { green } from 'logger'
import { isString } from 'dataTypes'

/*
    criteriaFields: the are derived
*/

/**
 * @returns {array} a list of transactionFields that can be used in criteria fields
 * @description Derived from transactionFields where isCriteraField === true
 */
const _fields = R.values(
  R.filter((x) => x.isCriteriaField === true, tFields)
)

const fields = R.mergeAll(_fields)

const fieldNames = R.map(
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


const operatorFields = {
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

const operators = R.values(operatorFields)

// /**
//  * @returns {array} a list of operators { name, description }
//  */
// const operatorSelectFields = R.values(operators)

/**
 * @returns {array} a list of operator field names
 */
// const operatorSelectFieldNames = R.map(
//   (f) => f.name,
//   operatorSelectFields
// )

// // const isValidOperatorField = (fieldName) => 
//   R.includes(fieldName, operatorSelectFieldNames)

// const isValidOperatorFieldValue = (fieldName, value) => 

const criteria = {
  fields,
  fieldNames,
  operators,
  operatorFields,
  // operatorSelectFieldNames,
  // operatorSelectFields,
  // isValidCriteriaField,
  // isValidCriteriaFieldValue,
  // isValidOperatorField,
  validate
}

export default criteria