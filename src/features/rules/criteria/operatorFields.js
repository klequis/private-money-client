import * as R from 'ramda'
import {
  wdBeginsWith,
  wdContains,
  wdDoesNotContain,
  wdEquals,
  wdSelect
} from 'appWords'
//eslint-disable-next-line
import { blue } from 'logger'

export const operatorFields = {
  select: {
    name: wdSelect,
    description: 'Select'
  },
  beginsWith: {
    name: wdBeginsWith,
    description: 'Begins with'
  },
  contains: {
    name: wdContains,
    description: 'Contains'
  },
  doesNotContain: {
    name: wdDoesNotContain,
    description: 'Does not contain'
  },
  equals: {
    name: wdEquals,
    description: 'Equals'
  }
}

export const operatorList = R.values(operatorFields)

export const operatorNames = R.map((f) => f.name, operatorFields)
