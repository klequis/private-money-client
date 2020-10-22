import * as R from 'ramda'

//eslint-disable-next-line
import { blue } from 'logger'

export const operatorFields = {
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

export const operatorList = R.values(operatorFields)

export const operatorNames = R.map(
  (f) => f.name,
  operatorFields
)