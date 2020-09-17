import { format } from 'date-fns'
import * as R from 'ramda'

export const requestStatus = {
  error: 'request-error',
  fulfilled: 'request-fulfilled',
  idle: 'idle',
  pending: 'request-pending'
}

export const transactionFields = {
  _id: {
    name: '_id',
    description: 'Id'
  },
  acctId: {
    name: 'acctId',
    description: 'AccountId',
    isCriteriaField: true
  },
  category1: {
    name: 'category1',
    description: 'Category1'
  },
  category2: {
    name: 'category2',
    description: 'Category2'
  },
  checkNumber: {
    name: 'checkNumber',
    description: 'Check#'
  },
  credit: {
    name: 'credit',
    description: 'Credidt',
    isCriteriaField: true
  },
  date: {
    name: 'date',
    description: 'Date',
    formatFn: (d) => format(new Date(d), 'MM/dd/yyyy'),
    isCriteriaField: true
  },
  debit: {
    name: 'debit',
    description: 'Debit',
    isCriteriaField: true
  },
  description: {
    name: 'description',
    description: 'Description',
    isCriteriaField: true
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
    formatFn: (d) => (d ? 'yes' : 'no')
  },
  origDescription: {
    name: 'origDescription',
    description: 'OrigDescription'
  },
  ruleIds: {
    name: 'ruleIds',
    description: 'RuleIds'
  },
  taxDeduct: {
    name: 'taxDeduct',
    description: 'taxDeduct'
  },
  type: {
    name: 'type',
    description: 'Type',
    isCriteriaField: true
  }
}

export const criteriaSelectFields = R.values(
  R.filter((x) => x.isCriteriaField === true, transactionFields)
)
export const criteriaSelectFieldNames = R.map(
  (f) => f.name,
  criteriaSelectFields
)

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

export const actionTypes = {
  replaceAll: {
    name: 'replaceAll',
    description: 'Rename'
  },
  categorize: {
    name: 'categorize',
    description: 'Categorize'
  },
  strip: {
    name: 'strip',
    descrption: 'Strip'
  }
}

export const actionTypeSelectFields = R.values(actionTypes)

export const actionFields = {
  actionType: {
    name: 'actionType',
    description: 'Action Type'
  },
  field: {
    name: 'field',
    description: 'Field'
  },
  findValue: {
    name: 'findValue',
    description: 'Find value'
  },
  numAdditionalChars: {
    name: 'numAdditionalChars',
    description: 'Number additional characters'
  },
  replaceWithValue: {
    name: 'replaceWithValue',
    description: 'Replace with value'
  },
  category1: {
    name: 'category1',
    description: 'Category 2'
  },
  category2: {
    name: 'category2',
    description: 'Category 2'
  }
}

