export const requestStatus = {
  error: 'request-error',
  fulfilled: 'request-fulfilled',
  idle: 'idle',
  pending: 'request-pending',
}

export const transactionFields = {
  _id: {
    name: '_id',
    description: 'Id'
  },
  acctId: {
    name: 'acctId',
    description: 'AccountId'
  },
  date: {
    name: 'date',
    description: 'Date',
    formatFn: d => format(new Date(d), 'MM/dd/yyyy')
  },
  description: {
    name: 'description',
    description: 'Description'
  },
  duplicate: {
    name: 'duplicate',
    description: 'Duplicate'
  },
  duplicateStatus: {
    name: 'duplicateStatus',
    description: 'DuplicateStatus'
  },
  origDescription: {
    name: 'origDescription',
    description: 'OrigDescription'
  },
  credit: {
    name: 'credit',
    description: 'Credidt'
  },
  debit: {
    name: 'debit',
    description: 'Debit'
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
    description: 'Type'
  },
  omit: {
    name: 'omit',
    description: 'Omit',
    formatFn: d => d ? 'yes' : 'no'
  }
}

export const operators = {
  beginsWith: 'beginsWith',
  contains: 'contains',
  doesNotContain: 'doesNotContain',
  equals: 'equals',
  regex: 'regex',
}
