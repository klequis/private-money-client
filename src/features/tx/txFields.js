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
import {
  wdAcctId,
  wdAmount,
  wdCategory1,
  wdCategory2,
  wdCheckNumber,
  wdDate,
  wdDescription,
  wdDuplicate,
  wdDuplicateStatus,
  wdId,
  wdOmit,
  wdOrigDescription,
  wdRuleIds,
  wdTaxDeduct,
  wdType,
  wdSelect
} from 'appWords'

export const txFields = {
  _id: {
    name: wdId,
    description: 'Id',
    validate: isString,
    dataType: dataTypes.String
  },
  acctId: {
    name: wdAcctId,
    description: 'AccountId',
    isCriteriaField: true,
    validate: isString,
    dataType: dataTypes.String
  },
  amount: {
    name: wdAmount,
    description: 'Amount',
    isCriteriaField: true,
    validate: isNumber,
    dataType: dataTypes.Number
  },
  category1: {
    name: wdCategory1,
    description: 'Category1',
    validate: isString,
    dataType: dataTypes.String
  },
  category2: {
    name: wdCategory2,
    description: 'Category2',
    validate: isString,
    dataType: dataTypes.String
  },
  checkNumber: {
    name: wdCheckNumber,
    description: 'Check#',
    validate: isString,
    dataType: dataTypes.String
  },
  date: {
    name: wdDate,
    description: 'Date',
    formatFn: (d) => format(new Date(d), 'MM/dd/yyyy'),
    isCriteriaField: true,
    validate: isDate,
    dataType: dataTypes.Date
  },
  description: {
    name: wdDescription,
    description: 'Description',
    isCriteriaField: true,
    validate: isString,
    dataType: dataTypes.String
  },
  duplicate: {
    name: wdDuplicate,
    description: 'Duplicate'
  },
  duplicateStatus: {
    name: wdDuplicateStatus,
    description: 'DuplicateStatus'
  },
  omit: {
    name: wdOmit,
    description: 'Omit',
    formatFn: (d) => (d ? 'yes' : 'no'),
    dataType: dataTypes.Boolean
  },
  origDescription: {
    name: wdOrigDescription,
    description: 'OrigDescription',
    validate: isString,
    dataType: dataTypes.String
  },
  ruleIds: {
    name: wdRuleIds,
    description: 'RuleIds',
    validate: isArray,
    dataType: dataTypes.Array
  },
  taxDeduct: {
    name: wdTaxDeduct,
    description: 'taxDeduct',
    validate: isBoolean,
    dataType: dataTypes.Boolean
  },
  type: {
    name: wdType,
    description: 'Type',
    isCriteriaField: true,
    validate: isString,
    dataType: dataTypes.String
  },
  select: {
    name: wdSelect,
    description: 'Select',
    isCriteriaField: true,
    validate: isString,
    dataType: dataTypes.String
  }
}

export const txFieldNames = R.values(R.map((x) => x.name, txFields))
