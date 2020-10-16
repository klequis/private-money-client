import * as R from 'ramda'

export const operators = {
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

export const operatorSelectFields = R.values(operators)
export const operatorSelectFieldNames = R.map(
  (f) => f.name,
  operatorSelectFields
)