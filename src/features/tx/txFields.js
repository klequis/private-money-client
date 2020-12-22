import { format } from 'date-fns'
import { 
  isArray,
  isBoolean,
  isDate,
  isNumber,
  isString,
  dataTypes
} from 'lib/dataTypes'
import * as R from 'ramda'

export const txFields = {
  _id: {
    name: '_id',
    description: 'Id',
    validate: isString,
    dataType: dataTypes.String
  },
  acctId: {
    name: 'acctId',
    description: 'AccountId',
    isCriteriaField: true,
    validate: isString,
    dataType: dataTypes.String
  },
  amount: {
    name: 'amount',
    description: 'Amount',
    isCriteriaField: true,
    validate: isNumber,
    dataType: dataTypes.Number
  },
  category1: {
    name: 'category1',
    description: 'Category1',
    validate: isString,
    dataType: dataTypes.String
  },
  category2: {
    name: 'category2',
    description: 'Category2',
    validate: isString,
    dataType: dataTypes.String
  },
  checkNumber: {
    name: 'checkNumber',
    description: 'Check#',
    validate: isString,
    dataType: dataTypes.String
  },
  date: {
    name: 'date',
    description: 'Date',
    formatFn: (d) => format(new Date(d), 'MM/dd/yyyy'),
    isCriteriaField: true,
    validate: isDate,
    dataType: dataTypes.Date
  },
  description: {
    name: 'description',
    description: 'Description',
    isCriteriaField: true,
    validate: isString,
    dataType: dataTypes.String
  },
  duplicate: {
    name: 'duplicate',
    description: 'Duplicate'
  },
  duplicateStatus: {
    name: 'duplicateStatus',
    description: 'DuplicateStatus'
  },
  omit: {
    name: 'omit',
    description: 'Omit',
    formatFn: (d) => (d ? 'yes' : 'no'),
    dataType: dataTypes.Boolean
  },
  origDescription: {
    name: 'origDescription',
    description: 'OrigDescription',
    validate: isString,
    dataType: dataTypes.String
  },
  ruleIds: {
    name: 'ruleIds',
    description: 'RuleIds',
    validate: isArray,
    dataType: dataTypes.Array
  },
  taxDeduct: {
    name: 'taxDeduct',
    description: 'taxDeduct',
    validate: isBoolean,
    dataType: dataTypes.Boolean
  },
  type: {
    name: 'type',
    description: 'Type',
    isCriteriaField: true,
    validate: isString,
    dataType: dataTypes.String
  }
}

export const txFieldNames = R.values(R.map(x => x.name, txFields))